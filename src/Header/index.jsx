import React, { Component } from 'react'
import styled from 'styled-components'

const Header = styled.div`
  height: 35px;
  width: 100%;
  border-bottom: solid 1px #999;
  display: flex;
  justify-content: flex-end;
  align-items: baseline;
`

export default class Browse extends Component {
  handleLogout(){
    this.props.session.logOut()
    window.location.replace('login')
  }
  render(){
    const { session } = this.props
    const user = session.get('user', { name: '' })
    return (
      <Header>
      <span>{user.name}</span>
      {
        user.name && <button onClick={() => this.handleLogout()}>LOG OUT</button>
      }
      </Header>
    )
  }
}
