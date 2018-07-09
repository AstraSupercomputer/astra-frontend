import React from 'react'
import Cookies from 'js-cookie';
import Image from './core/Image'
import Button from './core/Button'
import {Container} from 'flux/utils';
import logo from '../images/Astra-Logo-White.png'
import CurrentUserStore from '../stores/CurrentUserStore'
import CurrentDeviceStore from '../stores/CurrentDeviceStore'
import ProjectsStore from '../stores/ProjectsStore'
import CurrentUserActions from '../actions/CurrentUserActions'

import '../css/index.css'
import '../css/Button.css'

class TopBar extends React.Component {
  static getStores() {
    return [CurrentUserStore, CurrentDeviceStore, ProjectsStore];
  }
  
  static calculateState(prevState) {
    return {error: CurrentUserStore.getErrors().server 
                    && CurrentDeviceStore.getErrors().server 
                    && ProjectsStore.getErrors().server
    };
  }

  handleLogout = () => {
    CurrentUserActions.logout();
  }

  render() {
    const logoutButton = () => {
      if (Cookies.get("email") !== undefined) {
        return(
          <Button className='logout-button' handleClick={this.handleLogout}> 
              Logout 
          </Button>
        );
      } 
    }

    return(
      <div className='top-bar'>
        <div>
          <div style={{marginLeft: '1em'}}>
            <Button className='no-button'>
              <Image src={logo} height={30} width={30} style={{marginTop: '0.8em'}}/>
            </Button>         
          </div>
          <div style={{position: 'fixed', right: '1em', top: '0.5em'}}>
            <Button className='light-link'> Help </Button>
            <Button className='light-link'> About </Button>
            <Button className='light-link'> Request a feature </Button>
            {logoutButton()}
          </div>
        </div>
      </div>
    );
  }
}

export default Container.create(TopBar);