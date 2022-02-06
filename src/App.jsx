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
      <React.Fragment>
        { page !== 'login' && <Header session={session} navigate={navigate} page={page} /> }
        <div className="container">
          <Component
            session={session}
            navigate={navigate}
            location={location}
            page={page}
          />
        </div>
      </React.Fragment>
    )
  }
}

export default App;
