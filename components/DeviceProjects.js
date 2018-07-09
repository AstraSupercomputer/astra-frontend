import React from 'react'
import {Container} from 'flux/utils';
import Button from "./core/Button"
import AddButton from './core/AddButton'
import CurrentDeviceStore from '../stores/CurrentDeviceStore'
import CurrentUserActions from '../actions/CurrentUserActions'

import '../css/DeviceView.css'
import '../css/Button.css'

class DeviceProjects extends React.Component {
  static getStores() {
    return [CurrentDeviceStore];
  }

  static calculateState(prevState) {
    return CurrentDeviceStore.getProjects();
  }

  _handleSuspend = () => {
    // CurrentUserActions.suspendProject(url);
  }

  render() {
    let col1 = Object.keys(this.state).slice(0, 4);
    let col2 = Object.keys(this.state).slice(4, 8);

    const noProjects = () => {
      return (Object.keys(this.state).length ? null : 
        <div style={{margin: '1em 0em', fontSize: 'large', opacity: '0.5'}}>
          No projects yet. Click on the <span style={{fontSize: 'x-large'}}> + </span> button to add one 
          and start contributing.
        </div>
      );
    }

    const projectMini = (url, index) => {
      return (
        <div className='project-mini'>
          <Button className='dark-link' href={'/projects#'+this.state[url].name} style={{fontSize: 'small'}}> 
            {this.state[url].name.length > 24 ? this.state[url].name.slice(0, 20) + '...' : this.state[url].name}
          </Button>
          <Button handleClick={this._handleSuspend} className='dark-link' 
          style={{color: this.state[url].active ?  '#d91919' : '#37c91a', float: 'right', fontSize: 'small'}}> 
            {this.state[url].active ? 'Suspend' : 'Resume'} 
          </Button>
        </div>
      );
    }

    return (
      <div style={{fontSize: 'large', marginTop: '2em', width: '45%'}}>
        <div  style={{marginBottom: '0.5em'}}>
          Projects
          <AddButton href='/projects' type='circular'/>
        </div>
        {noProjects()}
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
          <div> {col1.map(projectMini)} </div>
          <div> {col2.map(projectMini)} </div>
        </div>
      </div>
    );
  }
}

export default Container.create(DeviceProjects);