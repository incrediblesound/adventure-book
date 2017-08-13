import React, { Component } from 'react'
import styled from 'styled-components'

const Header = styled.div`
  height: 35px;
  width: 100%;
  border-bottom: solid 1px #999;
  padding: 5px 5px 0px 5px;
  display: flex;
  justify-content: space-between;
`

const LeftSide = styled.div`
  justify-content: flex-start;
  align-items: baseline;
`

const RightSide = styled.div`
  justify-content: flex-end;
  align-items: baseline;
`

const Name = styled.span`
  text-transform: uppercase;
  margin: 0px 10px;
`

export default class Browse extends Component {
  handleLogout(){
    this.props.session.logOut()
    this.props.navigate('login')
  }
  render(){
    const { session } = this.props
    const user = session.get('user', { name: '' })
    const isAuthenticated = this.props.session.isAuthenticated()
    return (
      <Header>
        <LeftSide>
          <button onClick={() => this.props.navigate('home')}>HOME</button>
        </LeftSide>
        <RightSide>
          <Name>{user.name}</Name>
          <button onClick={() => this.handleLogout()}>{ isAuthenticated ? 'LOG OUT' : 'LOG IN' }</button>
        </RightSide>
      </Header>
    )
  }
}
