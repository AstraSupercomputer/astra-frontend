import React from 'react'
import ProfileHead from './ProfileHead'
import BalanceBar from './BalanceBar'
import AchievementsBar from './AchievementsBar'

import '../css/ProfileView.css'

class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isMobile: window.innerWidth < 700};
  }

  onWindowResize = () => {
    this.setState({ isMobile: window.innerWidth < 700 });
  }

  componentDidMount() {
    window.addEventListener('resize', this.onWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
  }

  render() {
    return(
      <div className='profile-view' style={{left: this.state.isMobile ? '1em' : '9em'}}>
        <div style={{fontSize: 'xx-large', marginBottom: '1em'}}> Profile </div>
        <ProfileHead />
        <div style={{display: 'flex'}}> 
          <BalanceBar />
          <AchievementsBar />
        </div>
      </div>
    );
  }
}

export default ProfileView;