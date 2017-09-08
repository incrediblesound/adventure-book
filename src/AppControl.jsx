import React, { Component } from 'react';
import Session from './data/Session.js'

const session = new Session()

export default class AppControl extends Component {
  constructor(){
    super()

    let hash = window.location.hash.split('#')[1]

    this.state = {
      hash
    }
  }
  componentWillMount(){
    const interval = window.setInterval(() => {
      let hash = window.location.hash.split('#')[1]
      if(hash !== this.state.hash){
        this.setState({
          hash
        })
      }
    }, 100)
    this.setState({
      interval
    })
  }
  componentWillUnmount(){
    window.clearInterval(this.state.interval)
  }
  componentDidMount(){
    session.onUpdate(() => {
      this.forceUpdate()
    })
  }
  render(){
    const location = this.state.hash
    const navigate = (path, dirty) => {
      if(location === 'create' && dirty){
        const proceed = confirm('Navigating away will destroy any unsaved changes, continue?')
        if (proceed) {
          window.location.replace(`#${path}`)
        }
      } else {
        window.location.replace(`#${path}`)
      }
    }
    session.navigate = navigate

    if(!location){
      navigate('home')
      return <noscript />
    }
    const app = this.props.children
    return (
      <div>
        {React.cloneElement(app, {location, session, navigate})}
      </div>
    )
  }
}
