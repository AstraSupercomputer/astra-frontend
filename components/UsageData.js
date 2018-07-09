import React from 'react'
import UsageGraph from './UsageGraph'
import FractionGraph from './FractionGraph'

import InfoIcon from '../images/info_icon.png'
import Image from './core/Image'
import ReactTooltip from 'react-tooltip'

import '../css/DeviceView.css'

class UsageData extends React.Component {
  render() {
    return(
      <div className='usage-data'>
        <div style={{fontSize: 'x-large', margin: '0px', color: '#818181', backgroundColor: '#d7d7d7', 
          padding: '0.3em 1em', height: '1.2em', borderTopLeftRadius: '4px', borderTopRightRadius: '4px',
          display: 'flex', position: 'relative'}}>
          <Image data-tip data-for='usage-info' src={InfoIcon} height={20} width={20} style={{marginTop: '0.2em'}}/>
          <ReactTooltip id='usage-info' place="top" type="light" effect="solid">
            Recorded data about your computer's performance <br /> 
            and time history, as well as the share of resources<br /> 
            taken up by each project. <br /> 
          </ReactTooltip>
          <div style={{position: 'absolute', right: '0em', margin: '0.1em 1em'}}>Usage</div>
        </div>
        <hr style={{margin: '0em', backgroundColor: '#c0c0c0', border: 'none', height: '1px'}}/>
        <UsageGraph/>
        <hr style={{margin: '1em 0em 0em', backgroundColor: '#c0c0c0', border: 'none', height: '1px'}}/>
        <FractionGraph/>
      </div>
    );
  }
}

export default UsageData;