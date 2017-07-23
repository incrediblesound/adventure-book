import React, { Component } from 'react';

export default class Browse extends Component {
  handleLogin(){
    window.location.replace('#login')
  }
  render(){
    return (
      <div>
      <button onClick={this.handleLogin}>login</button>
      </div>
    )
  }
}
