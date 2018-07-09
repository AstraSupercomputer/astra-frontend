import React from 'react'
import {Container} from 'flux/utils';
import Slider from 'rc-slider';
import Center from 'react-center'
import CurrentDeviceStore from '../stores/CurrentDeviceStore'
import CurrentDeviceActions from '../actions/CurrentDeviceActions'

import InfoIcon from '../images/info_icon_dark.png'
import Image from './core/Image'
import ReactTooltip from 'react-tooltip'

import '../css/DeviceView.css'
import 'rc-slider/assets/index.css';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const ToolTipSlider = createSliderWithTooltip(Slider);

const resourceDetail = {
  cpu: {
    usage: "Maximum percent of CPU time to use",
    cores: "Maximum number of CPU cores to use",
    other:  "Minimum amount of non-Astra CPU usage to suspend computation"
  },
  disk: {
    usage: "Maximum percent of disk space to use",
  },
  ram: {
    idle: "Maximum percent of memory to use when computer is not in use",
    busy: "Maximum percent of memory to use when computer is being used",
  },
  network: {
    up: "Maximum KB/s upload rate of file transfers",
    down: "Maximum KB/s download rate of file transfers",
  }
}

class UsageConsole extends React.Component {
  static getStores() {
    return [CurrentDeviceStore];
  }
  
  static calculateState(prevState) {
    return Object.assign(CurrentDeviceStore.getLimits(), {maxCores: CurrentDeviceStore.getInfo().numCores});
  }

  _setNested = (resource, element, value) => {
    var state = this.state;
    state[resource][element] = value;
    this.setState(state);
  }

  changeCPUPercent = (value) => null //CurrentDeviceActions.changeCPUPercent(CurrentDeviceStore.getUID(), value);
  changeCPUCores = (value) => null // CurrentDeviceActions.changeCPUCores(CurrentDeviceStore.getUID(), value);
  changeRAMPercent = (value) => null // CurrentDeviceActions.changeRAMPercent(CurrentDeviceStore.getUID(), value);
  changeDiskPercent = (value) => null // CurrentDeviceActions.changeDiskPercent(CurrentDeviceStore.getUID(), value);
  changeNetworkDown = (value) => null // CurrentDeviceActions.changeNetworkDown(CurrentDeviceStore.getUID(), value);
  changeNetworkUp = (value) => null // CurrentDeviceActions.changeNetworkUp(CurrentDeviceStore.getUID(), value);

  render() {
    const UsageSlider = (resource, element, onAfterChange, min, max, percent=true) => 
      <div>
        <Center data-tip data-for={resource + element} style={{fontSize: 'small'}}> 
          {element.charAt(0).toUpperCase() + element.substr(1)} 
          <ReactTooltip id={resource + element} place="top" type="light" effect="solid">
            {resourceDetail[resource][element]}
          </ReactTooltip>
        </Center>
        <Center>
          <ToolTipSlider style={{margin: '1em 0em 1em', height: '10em'}} min={min} max={max} 
            defaultValue={this.state[resource][element]} onAfterChange={onAfterChange} 
            onChange={value => this._setNested(resource, element, value)}
            railStyle={{backgroundColor: '#c0c0c0'}} trackStyle={{backgroundColor: 'white'}} 
            handleStyle={{borderColor: 'white'}} vertical={true}/>
        </Center>
        <Center style={{width: '3em'}}> {String(this.state[resource][element]) + (percent ? '%' : '')} </Center>
      </div>

    return (
      <div className='usage-console'>
        <div style={{fontSize: 'x-large', margin: '0px', color: '#b1b1b1', backgroundColor: 'rgba(48, 48, 48, 0.3)', 
          padding: '0.3em 1em', height: '1.2em', borderTopLeftRadius: '4px', borderTopRightRadius: '4px',
          display: 'flex', position: 'relative'}}>
          <Image data-tip data-for='resource-info' src={InfoIcon} height={20} width={20} style={{marginTop: '0.2em'}}/>
          <ReactTooltip id='resource-info' place="top" type="light" effect="solid">
            Usage constraints for computation, graphics, memory,<br/>
            and network. Hover over each use for more detail.<br/> 
          </ReactTooltip>
          <div style={{position: 'absolute', right: '0em', margin: '0.1em 1em'}}>Resources</div>
        </div>
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
          <div style={{margin: '1em 0em 1em 1em', backgroundColor: 'rgba(48, 48, 48, 0.2)', borderRadius: '5px', 
            padding: '0.7em 0.7em',}}>
            <Center style={{fontSize: 'large', marginBottom: '0.3em'}}> CPU </Center>
            <div style={{display: 'flex'}}>
              {UsageSlider('cpu', 'usage', this.changeCPUPercent, 0, 100)}
              {UsageSlider('cpu', 'other', this.changeCPUPercent, 0, 100)}
              {UsageSlider('cpu', 'cores', this.changeCPUCores, 0, this.state.maxCores, false)}
            </div>
          </div>
          <div style={{margin: '1em 0em 1em 0.7em', backgroundColor: 'rgba(48, 48, 48, 0.2)', borderRadius: '5px', 
            padding: '0.7em 0.7em'}}>
            <Center style={{fontSize: 'large', marginBottom: '0.3em'}}> Disk </Center>
            {UsageSlider('disk', 'usage', this.changeDiskPercent, 0, 100)}
          </div>
          <div style={{margin: '1em 0em 1em 0.7em', backgroundColor: 'rgba(48, 48, 48, 0.2)', borderRadius: '5px', 
            padding: '0.7em 0.7em'}}>
            <Center style={{fontSize: 'large', marginBottom: '0.3em'}}> RAM </Center>
            <div style={{display: 'flex'}}>
              {UsageSlider('ram', 'idle', this.changeRamPercent, 0, 100)}
              {UsageSlider('ram', 'busy', this.changeRamPercent, 0, 100)}
            </div>
          </div>
          <div style={{margin: '1em 1em 1em 0.7em', backgroundColor: 'rgba(48, 48, 48, 0.2)', borderRadius: '5px', 
            padding: '0.7em 0.7em'}}>
            <Center style={{fontSize: 'large', marginBottom: '0.3em'}}> Network </Center>
            <div style={{display: 'flex'}}>
              {UsageSlider('network', 'up', this.changeNetworkUp, 0, 100, false)}
              {UsageSlider('network', 'down', this.changeNetworkDown, 0, 100, false)}
            </div>
          </div> 
        </div>
      </div>
    );
  }
}

export default Container.create(UsageConsole);