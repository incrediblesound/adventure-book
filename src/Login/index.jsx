import React, { Component } from 'react';
import styled from 'styled-components'

const InputGroup = styled.div`
  margin: 5px 0px;
  label {
    display: block;
  }
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

const Error = styled.p`
  color: #FF4136;
`

export default class Login extends Component {
  constructor(){
    super()
    this.state = {
      error: null,
      isLogin: false,
      name: '',
      password: '',
      email: '',
    }
  }
  auth = () => {
    const { name, password, email, isLogin } = this.state
    if(isLogin){
      this.props.session.logIn({ name, password })
        .then(({ data }) => {
          const { userExists, user } = data
          if(!userExists) {
            this.setState({ error: `That user doesn't exist, click "sign up to create it."` })
          } else {
            this.props.session.startSession(user)
            this.props.navigate('home')
          }
        })
    } else {
      this.props.session.createUser({ name, password, email })
        .then(({ data }) => {
          const { success, user, reason } = data
          if(success){
            this.props.session.startSession(user)
            this.props.navigate('home')
          } else {
            this.setState({ error: reason })
          }
        })
    }
  }
  componentDidMount(){
    if(this.props.session.isAuthenticated()){
      this.props.navigate('home')
    }
  }
  render(){
    const { isLogin, error } = this.state
    return (
      <div>
        <h2>
          <OptionText onClick={() => this.setState({ isLogin: true })} className={isLogin ? 'active' : 'passive'}>LOGIN</OptionText>
          <span> | </span>
          <OptionText onClick={() => this.setState({ isLogin: false })} className={isLogin ? 'passive' : 'active'}>SIGN UP</OptionText>
        </h2>
        <div>
          <InputGroup>
            <label>User name { isLogin ? ' or Email' : ''} </label>
            <input value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })}/>
          </InputGroup>
          {
            !isLogin && (
              <InputGroup>
                <label>Email </label>
                <input value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })}/>
              </InputGroup>
            )
          }
          <InputGroup>
            <label>Password</label>
            <input value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })}/>
          </InputGroup>
          <button onClick={this.auth}>GO</button>
        </div>
        <Error>{error || '' }</Error>
      </div>
    )
  }
}
