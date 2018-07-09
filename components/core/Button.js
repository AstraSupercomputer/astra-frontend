import React from 'react'
import {Link} from 'react-router-dom';
import '../../css/Button.css'

class Button extends React.Component {
  render() {
    var ButtonComponent = this.props.href ? Link : 'button';

    return(
      <ButtonComponent
        {... this.props}
        className={this.props.className || ''}
        onClick={this.props.handleClick || null}
        disabled={this.props.loading || null}
        to={this.props.href || null}>
        {this.props.children}
      </ButtonComponent>
    );
  }
}

export default Button;