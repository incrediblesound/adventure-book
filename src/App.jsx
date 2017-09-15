import React, { Component } from 'react';
import Header from './Header/index.jsx';
import styled from 'styled-components';


import Browse from './Stories/index.jsx'
import Login from './Login/index.jsx'
import Create from './Create/index.jsx'
import Story from './Story/index.jsx'
import Profile from './Profile/index.jsx'
import EditStory from './Edit/index.jsx'
import Examples from './Examples/index.jsx'
import About from './About/index.jsx'

const Backing = styled.div`
  background-color: lightsteelblue;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

const Container = styled.div`
  background-color: white;
  overflow-x: scroll;
  padding: 7px 40px;
  border-radius: 5px;
  box-shadow: 0px 1px 1px 1px #999;
  margin: 0px auto;
  position: absolute;
  top: 45px;
  height: 90%;
  width: 75%;
  left: 20px;
  right: 20px;
  font-family: 'Lato', sans-serif;
`

const routes = {
  'home': Browse,
  'login': Login,
  'create': Create,
  'view': Story,
  'profile': Profile,
  'edit': EditStory,
  'examples': Examples,
  'about': About,
}

class App extends Component {
  render(){
    const { location } = this.props
    const page = location.split('/')[0]
    const Component = routes[page]
    const { session, navigate } = this.props

    return (
      <Backing>
        { page !== 'login' && <Header session={session} navigate={navigate} page={page} /> }
        <Container>
          <Component
            session={session}
            navigate={navigate}
            location={location}
            page={page}
          />
        </Container>
      </Backing>
    )
  }
}

export default App;
