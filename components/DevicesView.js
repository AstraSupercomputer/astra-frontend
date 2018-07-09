import React from 'react'
import DeviceInfo from './DeviceInfo'
import DevicesHeader from './DevicesHeader'
import DeviceProjects from './DeviceProjects'
import UsageData from './UsageData'
import UsageConsole from './UsageConsole'
import TaskManager from './TaskManager'

import '../css/DeviceView.css'
import '../css/Button.css'
// import 'antd/dist/antd.css';


class DevicesView extends React.Component {
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
      <div className='device-view' style={{left: this.state.isMobile ? '1em' : '9em'}}>
        <div>
          <DevicesHeader/>
        </div>
        <div style={{float: 'left', display: 'flex', flexWrap: 'wrap', minWidth: '500px'}}>
          <DeviceInfo />
          <DeviceProjects />
          <UsageData/>
          <UsageConsole />
          <TaskManager />
        </div>
      </div>
    );
  }
}

export default DevicesView;