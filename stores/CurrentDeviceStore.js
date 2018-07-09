import ActionConstants from '../constants/ActionConstants'
import Dispatcher from '../dispatcher'
import ServerAPI from '../ServerAPI'
import moment from 'moment'
import {Store} from 'flux/utils'

class CurrentDeviceStore extends Store {
  constructor(dispatcher) {
    super(dispatcher);
    this.uid = 2;
    this.info = {
      name: "Soham's Macbook Pro",
      model: 'Apple Macbook Pro',
      processor: '2Ghz Intel Core I7',
      graphics: 'Intel Iris Graphics 570',
      memory: '8GB 1867 MHz LPDDR3',
      type: 'laptop',
      numCores: 4,
    };
    this.projects = {
      'http://setiathome.berkeley.edu/': {name: 'Seti@Home', active: true, disk: 25, resourceShare: 12, color: [55, 85, 185]},
      another_url: {name: 'SZTAKI Desktop Grid', active:  true, disk: 30, resourceShare: 22},
      yep_url: {name: 'Rosetta@home', active: false, disk: 10, resourceShare: 12},
      let_url: {name: 'Quake Catcher Network', active: false, disk: 12, resourceShare: 32},
      wowee: {name: 'ODLK1', active: true, disk: 5, resourceShare: 13},
      sdfa: {name: 'Asteroids@home', active: false, disk: 18,  resourceShare: 9},
      sddafdfa: {name: 'Amicable Numbers', active: true, disk: 12,  resourceShare: 14},
    }; // {url: {name, status}}
    this.preferences= {
      runOnBatteries: false,
      runIfActive: false,
      useMemoryOnly: false,
    };
    this.limits = {
      cpu: {usage: 50, cores: 1, other: 25},
      disk: {usage: 50},
      ram: {idle: 80, busy: 40},
      network: {down: 0, up: 0},
    };
    this.times = {
      monday: {start: 0, end: 24},
      tuesday: {start: 0, end: 24},
      wednesday: {start: 0, end: 24},
      thursday: {start: 0, end: 24},
      friday: {start: 0, end: 24},
      saturday: {start: 0, end: 24},
      sunday: {start: 0, end: 24},
    };
    /* Holds data for past 24 hours, 1 point for every 5 min, each point 3 digits in length */
    this.fineData = {
      cpu: [], 
      gpu: [], 
      disk: [], 
      network: [], 
    };
    /* Holds data for the past 90 days, 1 point for every day, each point 3 digits in length */
    this.coarseData = {
      cpu: [], 
      gpu: [], 
      disk: [], 
      network: [], 
    }; 

    this.timeStats = {
      active: moment.duration({days: 3, hours: 3, minutes: 25}),
      cpuAvailable: 0.789,
      gpuAvailable: 0.422,
      totalActive: moment.duration({months: 4, weeks: 1, days: 23, hours: 2, minutes: 12}),
      deviceAdded: moment(new Date(Date.now() - (5 * 30 * 24 * 60 * 60 * 1000)))
    };

    this.errors = {}

    this.tasks = {
      '15my18aa.19974.23172.12.39.40_1': {
        project: 'http://setiathome.berkeley.edu/',
        due: moment(new Date(Date.now() + (28 * 24 * 60 * 60 * 1000))),
        recieved: moment(new Date(Date.now() - (13 * 24 * 60 * 60 * 1000))),
        appVersion: 803,
        state: 'DLD',
        active: true,
        fractionDone: 0.13,
        cpuRunning: moment.duration(1000 * 2213.18),
        cpuRemaining: moment.duration(1000 * 9171.61),
      },
      '15my18aa.22362.17654.15.42.90_1': {
        project: 'http://setiathome.berkeley.edu/',
        due: moment(new Date(Date.now() + (14 * 24 * 60 * 60 * 1000))),
        recieved: moment(new Date(Date.now() - (4 * 24 * 60 * 60 * 1000))),
        appVersion: 803,
        state: 'DLD',
        active: true,
        fractionDone: 0.13,
        cpuRunning: moment.duration(1000 * 2210.99),
        cpuRemaining: moment.duration(1000 * 9173.31),
      },
    }
    
    for (var i = 0; i < 288; i++) {
      this.fineData.cpu.push(Math.floor(0.000002*Math.pow(i, 3) + 5*Math.random()));
      this.fineData.gpu.push(Math.floor(0.01*Math.exp(-i)*Math.abs(Math.cos(i/5)) + 10*Math.random()));
      this.fineData.disk.push(Math.floor(0.004*Math.pow(i - 48, 2) + 20*Math.random()));
      this.fineData.network.push(Math.floor((0.000004*Math.pow(i, 3) + 0.00003*Math.pow(i, 2) + 0.0004*i) + 5*Math.random()));
    }
    for (var j = 0; j < 80; j++) {
      this.coarseData.cpu.push(Math.floor(0.000002*Math.pow(j, 3) + 5*Math.random()));
      this.coarseData.gpu.push(Math.floor(0.01*Math.exp(-j)*Math.abs(Math.cos(i/5)) + 10*Math.random()));
      this.coarseData.disk.push(Math.floor(0.004*Math.pow(j - 48, 2) + 20*Math.random()));
      this.coarseData.network.push(Math.floor((0.000004*Math.pow(j, 3) + 0.00003*Math.pow(j, 2) + 0.0004*j) + 5*Math.random()));
    }
  }

  getUID() { return this.uid; }

  getInfo() { return this.info; }

  getProjects() { return this.projects; }

  getPreferences() { return this.preferences; }

  getLimits() { return this.limits; }

  getTimes() { return this.times; }
  
  getFineData() { return this.fineData; }

  getCoarseData() { return this.coarseData; }

  getFractionalData() { return this.projects; }

  getTimeStats() { return this.timeStats; }

  getTasks() { return this.tasks; }

  getErrors() { return this.errors; }

  __onDispatch(action) {
    var storeData;
    switch(action.type) {
      case ActionConstants.LOGIN:
        if (action.response.status !== 200) { break; } 
        this.uid = action.response.uid;
        storeData = ServerAPI.getDeviceStore(action.response.uid);

        this.info = storeData.info;
        this.projects = storeData.projects;
        this.preferences = storeData.preferences;
        this.limits = storeData.limits;
        this.times = storeData.times;
        this.coarseData = storeData.coarseData;
        this.fineData = storeData.fineData;
        
        break;
      case ActionConstants.DEVICE_CHANGE:
        storeData = action.response;

        this.info = storeData.info;
        this.projects = storeData.projects;
        this.preferences = storeData.preferences;
        this.limits = storeData.limits;
        this.times = storeData.times;
        this.coarseData = storeData.coarseData;
        this.fineData = storeData.fineData;

        break
      case ActionConstants.LOGOUT:
        this._currentDevice = {};
        break;  
      default:
        return;
    }

    this.__emitChange();
  }
}

export default new CurrentDeviceStore(Dispatcher);