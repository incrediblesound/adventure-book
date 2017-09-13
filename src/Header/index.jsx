import React, { Component } from 'react'
import styled from 'styled-components'

const Header = styled.div`
  font-family: 'Lato', sans-serif;
  background-color: white;
  height: 25px;
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

const HeaderLink = styled.span`
  color: ${props => props.disabled ? '#666' : 'blue'};
  margin: 2px 15px;
  cursor: ${props => props.disabled ? 'inherit' : 'pointer'};
`

export default class Browse extends Component {
  handleLogout(){
    this.props.session.logOut()
    this.props.navigate('login')
  }

  render(){
    const { session, page } = this.props
    const user = session.get('user', { username: '' })
    return (
      <Header>
        <LeftSide>
          <HeaderLink disabled={page === 'home'} onClick={() => this.props.navigate('home')}>BROWSE</HeaderLink>
          <HeaderLink disabled={page === 'profile'} onClick={() => this.props.navigate('profile')}>MY STORIES</HeaderLink>
          <HeaderLink disabled={page === 'examples'} onClick={() => this.props.navigate('examples')}>EXAMPLES</HeaderLink>
          <HeaderLink disabled={page === 'about'} onClick={() => this.props.navigate('about')}>ABOUT</HeaderLink>
        </LeftSide>
        <RightSide>
          <Name>{user.username}</Name>
          <HeaderLink onClick={() => this.handleLogout()}>
            { user.username ? 'LOG OUT' : 'LOG IN' }
          </HeaderLink>
        </RightSide>
      </Header>
    )
  }
}
