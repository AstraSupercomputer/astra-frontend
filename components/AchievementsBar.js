import React from 'react'
import {Container} from 'flux/utils';
import Image from './core/Image'
import ReactTooltip from 'react-tooltip'
import Center from 'react-center'
import CurrentUserStore from '../stores/CurrentUserStore'
import InfoIcon from '../images/info_icon_dark.png'
import LevelConstants from '../constants/LevelConstants'

import '../css/ProfileView.css'

class AchievementsBar extends React.Component {
  static getStores() {
    return [CurrentUserStore];
  }
  
  static calculateState(prevState) {
    return CurrentUserStore.getAchievements();
  }

  render () {
    return(
      <div className='achievements-bar'>
        <div style={{fontSize: 'x-large', margin: '0px', color: '#b1b1b1', backgroundColor: 'rgba(48, 48, 48, 0.3)', 
          padding: '0.3em 1em', height: '1.2em', borderTopLeftRadius: '4px', borderTopRightRadius: '4px',
          display: 'flex', position: 'relative'}}>
          <Image data-tip data-for='resource-info' src={InfoIcon} height={20} width={20} style={{marginTop: '0.2em'}}/>
          <ReactTooltip id='resource-info' place="top" type="light" effect="solid">
            Usage constraints for computation, graphics, memory,<br/>
            and network. Hover over each use for more detail.<br/> 
          </ReactTooltip>
          <div style={{position: 'absolute', right: '0em', margin: '0.1em 1em'}}>Achievements</div>
        </div>
        <div className='dark-box'>
          <div>XP</div>
          <div style={{position: 'absolute', right: '1em', top: '1em'}}>
            <Center style={{fontSize: 'x-large', fontWeight: 400}}>{this.state.xp}</Center>
            <Center>points</Center>
          </div>
        </div>
        <div style={{backgroundColor: 'rgba(48, 48, 48, 0.5)', borderRadius: '5px', margin: '1em', padding: '1em'}}>
          <div style={{marginBottom: '1em'}}> Current Level </div>
          <div style={{display: 'flex'}}>
            <div style={{display: 'flex'}}>
              <Image src={LevelConstants[this.state.level].image} width={90} height={90}/>
              <div style={{marginLeft: '1em'}}>
                <div style={{display: 'flex', fontSize: '22px'}}> 
                  <div style={{margin: '0.7em 0.5em 0em 0em'}}> Level </div>
                  <div style={{fontWeight: 400, fontSize: '40px'}}> {this.state.level} </div> 
                </div>
                <div> {LevelConstants[this.state.level].name} </div>
              </div>
            </div>
            <div style={{margin: '2em 0.8em 0em'}}>
              <div style={{display: 'flex', marginBottom: '0.3em'}}>
                <div style={{backgroundColor: 'rgb(216, 216, 216)', height: 15, width: 15, borderRadius: 30}} />
                <div style={{height: 2, width: '5em', backgroundColor: 'rgb(216, 216, 216)',
                  marginTop: 6}}/>
                <div style={{height: 15, width: 15, borderRadius: 30, border: '1px solid rgb(216, 216, 216)'}} />
              </div>
              <Center>+ {LevelConstants[this.state.level + 1].xp - this.state.xp} XP</Center>
            </div>
            <div>
              <div style={{display: 'flex'}}>
                <Image src={LevelConstants[this.state.level + 1].image} width={40} height={40}/>
                <div style={{marginLeft: '1em'}}>
                  <div style={{display: 'flex', fontSize: '12px'}}> 
                    <div style={{margin: '0.9em 0.5em 0em 0em'}}> Level </div>
                    <div style={{fontWeight: 400, fontSize: '24px'}}> {this.state.level + 1} </div> 
                  </div>
                  <div style={{fontSize: '12px'}}> {LevelConstants[this.state.level + 1].name} </div>
                </div>
              </div>
              <div style={{marginTop: '0.8em', display: 'flex'}}>
                <div style={{marginTop: '0.6em', fontSize: 'small'}}> Rewards </div>
                <div style={{fontSize: 'x-large', margin: '0em 0.2em 0em 0.7em'}}> 
                  {LevelConstants[this.state.level + 1].starBonus} 
                </div>
                <div style={{marginTop: '0.5em'}}> STARS </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Container.create(AchievementsBar);