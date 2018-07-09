import React from 'react'
import {Container} from 'flux/utils'
import Center from 'react-center'
import moment from 'moment'
import momentDurationFormatSetup from "moment-duration-format"
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer, Tooltip, Text } from 'recharts'
import CurrentDeviceStore from '../stores/CurrentDeviceStore'

import '../css/DeviceView.css'

momentDurationFormatSetup(moment);

class FractionGraph extends React.Component {
  static getStores() {
    return [CurrentDeviceStore];
  }

  static calculateState(prevState) {
    let rawData = CurrentDeviceStore.getFractionalData();
    let timeStats = CurrentDeviceStore.getTimeStats();
    
    var data = [];
    var maxPercent = 0;
    Object.keys(rawData).forEach(project => {
      maxPercent = Math.max(maxPercent, rawData[project].disk, rawData[project].resourceShare);
      data.push({
        project: rawData[project].name, 
        diskUsage: rawData[project].disk, 
        resourceShare: rawData[project].resourceShare});
    });
    return {data: data, maxPercent: maxPercent, timeStats: timeStats};
  }

  render() {
    const noProjects = () => {
      return (Object.keys(this.state.data).length ? null : 
        <div style={{marginLeft: '2em', fontSize: 'large', color: '#b0b0b0'}}>
          No project data yet
        </div>
      );
    }

    return(
      <div className='fraction-graph'>
        <div style={{flexGrow: '2', padding: '1em 0em 1em'}}>
          <Center  style={{fontSize: 'large', margin: '0em 0em 0.5em 0.4em'}}>
            Project Allotment
          </Center>
          {noProjects()}
          <ResponsiveContainer height={230} width='100%'>
          <RadarChart outerRadius={80} height={100} data={this.state.data}>
            <PolarGrid />
            <PolarAngleAxis dataKey='project' tick={{fill: '#646464'}} 
              label={props => <Text width={0}>{props.value}</Text>}/>
            <PolarRadiusAxis angle={360/this.state.data.length} domain={[0, this.state.maxPercent]} 
              tickFormatter={(percent) => percent + "%"}/>
            <Radar name='Disk Usage' dataKey='diskUsage' stroke="#f476ff" fill="#be50b2" fillOpacity={0.6} />
            <Radar name='Resource Share' dataKey='resourceShare' stroke="#6f65ff" fill="#5a79ac" fillOpacity={0.6} />
            <Legend iconType='circle' />
            <Tooltip 
              wrapperStyle={{borderRadius: '5px'}}
              formatter={(value, name, props) => value + '%'}/>
          </RadarChart>
        </ResponsiveContainer>
        </div>
        <div style={{flexGrow: '1', marginLeft: '1.5em', minWidth: '17em', borderLeft: '1px solid #c0c0c0', paddingTop: '1em'}}>
          <Center  style={{fontSize: 'large', margin: '0em 0em 0.5em 0em'}}>
            Time Stats 
          </Center>
          <Center> 
            Duration Active
          </Center>
          <Center style={{fontSize: '23px', marginBottom: '0.7em', color: '#a0a0a0'}}> 
            {this.state.timeStats.active.format('YY [years] M [months] D [days] hh:MM')}
          </Center>
          <Center> 
            CPU Available
          </Center>
          <Center style={{fontSize: '23px', marginBottom: '0.7em', color: '#a0a0a0'}}> 
            {String(Math.round(this.state.timeStats.cpuAvailable*100)) + '%'}
          </Center>
          <Center> 
            GPU Available
          </Center>
          <Center style={{fontSize: '23px', marginBottom: '0.7em', color: '#a0a0a0'}}> 
            {String(Math.round(this.state.timeStats.gpuAvailable*100)) + '%'}
          </Center>
          <Center> 
            Device Added
          </Center>
          <Center style={{fontSize: '23px', marginBottom: '0em', color: '#a0a0a0'}}> 
            {this.state.timeStats.deviceAdded.format('MMM DD Y')}
          </Center>
        </div>
      </div>
    );
  }
}

export default Container.create(FractionGraph);