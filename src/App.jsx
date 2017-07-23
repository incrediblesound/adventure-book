import React, { Component } from 'react';
import storyText from './Adventure/example2'
import Adventure from './Adventure/'
import compiler from './Adventure/compiler'
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
  constructor(){
    super()
    window.onhashchange = () => this.forceUpdate()
  }
  render(){
    const Component = routes[this.props.location]
    return (
      <Component session={this.props.session}/>
    )
  }
}

export default App;
