import React, { Component } from 'react';
import styled from 'styled-components'

const InputGroup = styled.div`
  margin: 5px 0px;
  text-transform: uppercase;
`

const OptionText = styled.span`
  &.active {
    color: #0074D9;
    cursor: default;
  }
  &.passive {
    color: #999;
    &:hover {
      color: #7FDBFF;
      cursor: pointer;
    }
  }
`

export default class Login extends Component {
  constructor(){
    super()
    this.state = { isLogin: false, name: '', password: '' }
  }
  auth = () => {
    const { name, password, isLogin } = this.state
    if(isLogin){
      this.props.session.logIn({ name, password })
    } else {
      this.props.session.createUser({ name, password })
    }
  }
  render(){
    const isLogin = this.state.isLogin
    return (
      <div>
        <h2>
          <OptionText onClick={() => this.setState({ isLogin: true })} className={isLogin ? 'active' : 'passive'}>LOGIN</OptionText>
          <span> | </span>
          <OptionText onClick={() => this.setState({ isLogin: false })} className={isLogin ? 'passive' : 'active'}>SIGN UP</OptionText>
        </h2>
        <div>
          <InputGroup>
          <label>User name </label>
          <input value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })}/>
          </InputGroup>
          <InputGroup>
          <label>Password </label>
          <input value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })}/>
          </InputGroup>
          <button onClick={this.auth}>GO</button>
        </div>
      </div>
    )
  }
}
