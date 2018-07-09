import React from 'react'
import {Container} from 'flux/utils';
import moment from 'moment'
import Button from './core/Button'
import momentDurationFormatSetup from "moment-duration-format"
import CurrentDeviceStore from '../stores/CurrentDeviceStore'
import CurrentDeviceActions from '../actions/CurrentDeviceActions'
import ProgressBar from './core/ProgressBar'

import InfoIcon from '../images/info_icon.png'
import Image from './core/Image'
import ReactTooltip from 'react-tooltip'

import '../css/DeviceView.css'
import '../css/Button.css'

momentDurationFormatSetup(moment);

class TaskManager extends React.Component {
  static getStores() {
    return [CurrentDeviceStore];
  }

  static calculateState(prevState) {
    var tasks = CurrentDeviceStore.getTasks();
    let projects = CurrentDeviceStore.getProjects();

    Object.keys(tasks).forEach(name => {
      let url = tasks[name].project;
      tasks[name].project = {
        url: url,
        name: projects[url].name,
        color: projects[url].color,
      };
    });

    return tasks;
  }


  render() {
    const getColor = (color) => {
      return 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')'
    };

    const noTasks = () => {
      return (Object.keys(this.state).length ? null : 
        <div style={{margin: '2em', fontSize: 'x-large', color: '#b0b0b0'}}>
          No tasks yet. Start a project to get some!
        </div>
      );
    }

    return(
      <div className='tasks'>
        <div style={{fontSize: 'x-large', margin: '0px', color: '#818181', backgroundColor: '#d7d7d7', 
          padding: '0.3em 1em', height: '1.2em', borderTopLeftRadius: '4px', borderTopRightRadius: '4px',
          display: 'flex', position: 'relative'}}>
          <Image data-tip data-for='task-info' src={InfoIcon} height={20} width={20} style={{marginTop: '0.2em'}}/>
          <ReactTooltip id='task-info' place="top" type="light" effect="solid">
            Tasks are chunks of computation sent out <br /> 
            by a project and performed by workunits <br /> 
            on your computer.You can choose which <br /> 
            tasks to take. Hover over the progress bars <br /> 
            for estimated times to finish.
          </ReactTooltip>
          <div style={{position: 'absolute', right: '0em', margin: '0.1em 1em'}}>Tasks</div>
        </div>
        {noTasks()}
        {Object.keys(this.state).map(name => {
          let { project, due, recieved, appVersion, state, active, fractionDone, cpuRunning, cpuRemaining } = this.state[name];
          return (
            <div className='task'>
              <div style={{display: 'flex', position: 'relative', marginBottom: '1em'}}>
                <div style={{marginTop: '0.4em', fontSize: 'large'}}> {name} </div>
                <div style={{color: getColor(project.color), border: '1px solid ' + getColor(project.color), 
                  borderRadius: '5px', padding: '0.3em', position: 'absolute', right: '0em'}}>
                  {project.name}
                </div>
              </div>
              <ProgressBar width={30} progressTip={'Running for ' + cpuRunning.format('YY[y] M[m] D[d] H[h] m[m]')}
                endTip={cpuRemaining.format('YY[y] M[m] D[d] H[h] m[m]') + ' remaining'} percent={true} 
                status={active ? 'Running' : 'Suspended'} progress={fractionDone}/>
              <div style={{marginTop: '2em', display: 'flex', fontSize: 'small', position: 'relative'}}>
                <div style={{display: 'flex', flexWrap:'wrap'}}>
                  <div>
                    <div> Recieved </div>
                    <div style={{fontWeight: 400, marginTop: '0.3em'}}> {recieved.format('MM/DD HH:mm A')} </div>
                  </div>
                  <div style={{marginLeft: '2em'}}>
                    <div> Due </div>
                    <div style={{fontWeight: 400, marginTop: '0.3em'}}> {due.format('MM/DD HH:mm A')} </div>
                  </div>
                </div>
                <div style={{display: 'flex', flexWrap:'wrap', position: 'absolute', right: '0em', marginTop: '0.5em'}}>
                  <Button style={{marginRight: '0.5em'}} onClick={() => CurrentDeviceActions.quitTask(name)} className='quit'> 
                    Quit 
                  </Button>
                  <Button onClick={() => CurrentDeviceActions.suspendTask(name)} className='suspend'> 
                    Suspend 
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Container.create(TaskManager);