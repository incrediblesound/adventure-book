import React, { Component } from 'react';
import Session from './data/Session.js'

const session = new Session()

export default class AppControl extends Component {
  constructor(){
    super()
    let hash
    try {
      hash = window.location.hash.split('#')[1]
    } catch(e){
      hash = 'home'
    }
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
    const navigate = (path) => window.location.replace(`#${path}`)
    const location = this.state.hash || window.location.hash.split('#')[1]
    const app = this.props.children
    return (
      <div>
        {React.cloneElement(app, {location, session, navigate})}
      </div>
    )
  }
}
