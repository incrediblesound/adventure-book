import React, { Component } from 'react';
import Header from './Header/index.jsx';


import Browse from './Stories/index.jsx'
import Login from './Login/index.jsx'
import Create from './Create/index.jsx'
import Story from './Story/index.jsx'
import Profile from './Profile/index.jsx'
import EditStory from './Edit/index.jsx'

const routes = {
  'home': Browse,
  'login': Login,
  'create': Create,
  'view': Story,
  'profile': Profile,
  'edit': EditStory,
}

class App extends Component {
  render(){
    const { location } = this.props
    const path = location.split('/')[0]
    const Component = routes[path]
    const { session, navigate } = this.props

    return (
      <div>
        { path !== 'login' && <Header session={session} navigate={navigate} /> }
        <div className="container">
          <Component session={session} navigate={navigate} location={location}/>
        </div>
      </div>
    )
  }
}

export default App;
