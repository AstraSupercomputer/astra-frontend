import React from 'react'
import ReactTooltip from 'react-tooltip'

class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: props.progress || 0,
      running: props.running || true,
      status: props.status || null,
    };
  }

  addProgress = (amount) => {
    this.setState(this.state.progress + amount/100 > 1 ? 
      1 : this.state.progress + amount/100);
  }

  setStatus = (status, running) => {
    if (status) { this.setState(status); }
    if (running) { this.setState(running); }
  }

  setProgress = (percent) => {
    if (percent > 100) {
      this.setState({progress: 1});
    } else if (percent < 0) {
      this.setState({progress: 0});
    } else {
      this.setState({progress: percent/100});
    }
  }

  render() {
    const percent = () => !this.props.percent ? null :
      <div>
        {String(this.state.progress * 100) + '%'}
      </div>

    return(
      <div style={{display: 'flex'}}>
        <div> 
          {percent} 
        </div>
        <div style={{position: 'relative'}}>

          {/* Rail */}
          <div style={{backgroundColor: '#c0c0c0', height: '0.2em', width: String(this.props.width) + 'em', 
            position: 'absolute', margin: '0.2em'}}> 
          </div>

          {/* Rail End */}
          <div data-tip data-for='end' style={{backgroundColor: '#c0c0c0', height: '0.6em', width: '0.6em',
            position: 'absolute',  borderRadius: '10px', left: String(this.props.width) + 'em'}} /> 
          <ReactTooltip id='end' place="bottom" type="light" effect="solid">
            {this.props.endTip || null}
          </ReactTooltip>

          {/* Rail Start */}
          <div data-tip data-for='start' style={{backgroundColor: this.state.running ? '#5bbe8b' : '#bc4f54', 
            height: '0.6em', width: '0.6em', position: 'absolute',  borderRadius: '10px', left: '0em'}} />
          <ReactTooltip id='start' place="bottom" type="light" effect="solid"> 
            {this.props.startTip || null}
          </ReactTooltip>

          {/* Bar */}
          <div id='progress' style={{backgroundColor: this.state.running ? '#5bbe8b' : '#bc4f54', 
            borderRadius: '10px', height: '0.6em', width: String(this.props.width*this.state.progress) + 'em', 
            position: 'absolute', transition: 'all 0.2s ease'}}/> 
          <ReactTooltip id='progress' place="bottom" type="light" effect="solid">
            {this.props.progressTip || null}
          </ReactTooltip>

        </div>
        <div style={{color: this.state.running ? '#5bbe8b' : '#bc4f54', position: 'absolute',
          left: String(this.props.width + 3) + 'em', fontWeight: 400}}> 
          {this.state.status} 
        </div>
      </div>
    );
  }
}


export default ProgressBar;