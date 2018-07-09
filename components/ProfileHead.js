import React from 'react'
import {Container} from 'flux/utils';
import CurrentUserStore from '../stores/CurrentUserStore' 
import Image from './core/Image'
import Button from './core/Button'
import edit from '../images/Edit.png'

import '../css/Button.css'

class ProfileHead extends React.Component {
  static getStores() {
    return [CurrentUserStore];
  }
  
  static calculateState(prevState) {
    var data = CurrentUserStore.getData();
    return {
      name: data.firstName + ' ' + data.lastName,
      profile: data.profile,
      etherAddr: data.etherAddr || 'Add your ether address',
      email: CurrentUserStore.getUserEmail(),
      editing: false,
    };
  }

  render() {
    return(
      <div style={{display: 'flex'}}>
        <div style={{position: 'relative', marginRight: '1em'}}>
          <Image src={this.state.profile} height={70} width={70} 
            style={{borderRadius: '50%', border: '1px solid #c0c0c0'}} />
          <Button style={{position: 'absolute', right: '-0.4em', top: '-0.4em'}} className='edit no-button'>
            <Image src={edit} height={20} width={20} />
          </Button>
        </div>
        <div>
          <div style={{fontSize: 'x-large', marginBottom: '0.1em'}}>
            {this.state.name}         
          </div> 
          <div style={{marginBottom: '0.5em'}}> 
            {this.state.email} 
          </div>
          <div style={{backgroundColor: 'rgb(243, 243, 243, 0.85)', borderRadius: '30px',
            fontSize: 'small', display: 'flex'}}> 
            <div style={{padding: '0.3em .5em 0.3em 2em'}}>
              {this.state.etherAddr} 
            </div>
            <Button className='no-button'>
              <Image src={edit} height={20} width={20} />
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Container.create(ProfileHead);