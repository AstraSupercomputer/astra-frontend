import ActionConstants from '../constants/ActionConstants'
import DeviceConstants from '../constants/DeviceConstants'
import Dispatcher from '../dispatcher'
import ServerAPI from '../ServerAPI'
import {Store} from 'flux/utils'
import userProfile from '../images/User.png'
import cookie from "react-cookie";

class CurrentUserStore extends Store {
  constructor(dispatcher) {
    super(dispatcher);
    this.email = 'sohamkale98@gmail.com';
    this.data = {
      firstName: 'Soham',
      lastName: 'Kale',
      profile: userProfile,
      etherAddr: '0x91de3A33Aa17354908d4707b0905C6211c058961',
      level: 1,
    };
    this.balance = {
      stars: 421.56,
      rate: 0.78,
      earnings: []
    };
    this.devices = {
      1: {name: 'A device', platform: DeviceConstants.WINDOWS},
      2: {name: 'Another device', platform: DeviceConstants.MACOS},
      3: {name: 'A third device', platform: DeviceConstants.LINUX},
    }; // {uid: {name, platform}}
    this.achievements = {
      level: 1,
      xp: 52,
    };
    this.errors = {};

    for (var i = 0; i < 168; i++) {
      this.balance.earnings.push(Math.floor(0.02*Math.pow(i-73, 2) + 20*Math.random()));
    }
  }

  getData() { return this.data; }

  getUserEmail() {  return this.email; }

  getDevices() { return this.devices; }
  
  getName() { return (this.data.firstName + ' ' + this.data.lastName); }

  getBalance() { return this.balance; }

  getAchievements() { return this.achievements; }

  getErrors() { return this.errors; }

  getSideBarState() {
    return ({
      name: this.data.firstName + ' ' + this.data.lastName, 
      level: this.data.level, 
      profile: this.data.profile,
      stars: this.balance.stars,
    });
  }

  __onDispatch(action) {
    switch(action.type) {
      case ActionConstants.LOGGED_IN:
        action.response
        .then(response => {
          this.email = action.args.email;
          this.data = {
            firstName: response.data.data['first_name'],
            lastName: response.data.data['last_name'],
            profile: response.data.data['profile'],
            etherAddr: 3,
            /* Get level as well */
          };
          this.balance = {
            star: response.data.balance['star_balance'],
          };
          this.devices = response.data.devices;
        })
        .catch(error => {
          if (error.status >= 400) {
            this.errors.server = true;
          }

        });
        break;
      case ActionConstants.LOGOUT:
        break;
      default:
        return;
    }

    this.__emitChange();
  }
}

export default new CurrentUserStore(Dispatcher);