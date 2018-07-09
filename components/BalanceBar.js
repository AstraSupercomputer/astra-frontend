import React from 'react';
import {Container} from 'flux/utils';
import Image from './core/Image'
import Center from 'react-center'
import moment from 'moment'
import CurrentUserStore from '../stores/CurrentUserStore'
import ReactTooltip from 'react-tooltip'
import InfoIcon from '../images/info_icon.png'
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

import '../css/ProfileView.css'

class BalanceBar extends React.Component {
  static getStores() {
    return [CurrentUserStore];
  }

  static calculateState(prevState) {
    var balance = CurrentUserStore.getBalance();

    let today = new Date();
    var lastWeek = new Date();
    lastWeek.setDate(today.getDate() - 7);

    var values = [];
    balance.earnings.forEach(value => {
      values.push({
        time: lastWeek.getTime(),
        value: value,
      });
      lastWeek.setTime(lastWeek.getTime() + (60 * 60 * 1000));
    });

    balance.earnings = values;
    return balance;
  }

  render() {
    return(
      <div className='balance-bar'>
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
          <div style={{position: 'absolute', right: '0em', margin: '0.1em 1em'}}>Balance</div>
        </div>
        <div style={{display: 'flex'}}>
          <div className='gradient-box'>
            <div>Balance</div>
            <div style={{position: 'absolute', right: '1em', top: '1em'}}>
              <Center style={{fontSize: 'x-large', fontWeight: 400}}>{this.state.stars}</Center>
              <Center>STARS</Center>
            </div>
          </div>
          <div className='gradient-box'>
            <div>Earning Rate</div>
            <div style={{position: 'absolute', right: '1em', top: '1em'}}>
              <Center style={{fontSize: 'x-large', fontWeight: 400}}>{this.state.rate}</Center>
              <Center>STARS/sec</Center>
            </div>
          </div>
        </div>
        <div style={{fontSize: 'small', marginTop: '2em'}}>
          <div style={{margin: '0em 0em 0.5em 3em', fontSize: 'large'}}> Earning rate </div>
          <ResponsiveContainer height={350} width='98%'>
            <AreaChart data={this.state.earnings}>
              <defs>
                <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="2">
                  <stop offset="5%" stopColor="#be50b2" stopOpacity={0.6}/>
                  <stop offset="50%" stopColor="#5a79ac" stopOpacity={0.6}/>
                </linearGradient>
              </defs>
              <XAxis dataKey='time' name = 'Time' tickCount = {8} domain = {['dataMin', 'dataMax']} type = 'number'
                tickFormatter={(time) => moment(time).format('ddd h:mm')}/>
              <YAxis width={50}/>
              <Tooltip 
                wrapperStyle={{borderRadius: '5px'}}
                labelFormatter={(time) => {
                  return moment(time).format('dddd hh:mmA');
                }}
                formatter={(value, name, props) => value + ' STARS/sec'}
                />
              <CartesianGrid />
              <Area type="monotone" dataKey="value" stroke="#8884d8" dot={false} fillOpacity={1} 
                fill="url(#colorBalance)"/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}

export default Container.create(BalanceBar);
