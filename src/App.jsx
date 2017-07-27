import React, { Component } from 'react';
import storyText from './Adventure/example2'
import Adventure from './Adventure/'
import Browse from './Stories/index.jsx'
import Login from './Login/index.jsx'
import Create from './Create/index.jsx'

class Story extends Component {
  render() {
    const [story, text] = compiler(storyText)
    return (
      <Adventure
        story={story}
        onComplete={() => true}
        onFail={() => true}
      />
    );
  }
}

const routes = {
  'home': Browse,
  'login': Login,
  'create': Create,
  'view': Story
}

class App extends Component {
  render(){
    const Component = routes[this.props.location]
    const { session, navigate } = this.props

    return (
      <Component session={this.props.session} navigate={navigate}/>
    )
  }
}

export default App;
