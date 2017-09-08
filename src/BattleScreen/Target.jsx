import React, { Component } from 'react';
import { rndDown } from '../utilities.js'

export default class Browse extends Component {
  constructor(){
    super()
    this.state = {
      x: null,
      y: null,
      targetRendered: false,
    }
  }
  componentDidMount(){
    this.renderGrid()
  }
  shouldComponentUpdate(){
    return false
  }
  handleClick = (e) => {
    this.props.playerStrike()
    this.renderGrid()
    this.setState({
      targetRendered: false
    })
  }
  renderGrid(){
    const context = this.canvas.getContext('2d');
    context.clearRect(0, 0, 242, 242)
    for(let i = 1; i <= 241; i+= 20){
      context.strokeStyle = '#DDD'
      context.beginPath()
      context.moveTo(i,1)
      context.lineTo(i,240)
      context.stroke()
      context.beginPath()
      context.moveTo(1,i)
      context.lineTo(240,i)
      context.stroke()
      context.closePath()
    }
  }
  renderTarget(){
    if(!this.state.targetRendered){
      const context = this.canvas.getContext('2d')
      context.clearRect(0, 0, 242, 242)
      this.renderGrid()
      const x = 20 + rndDown(100)
      const y = 20 + rndDown(100)
      context.arc(x, y, 20, 0, 2 * Math.PI, false);
      context.fillStyle = 'red'
      context.fill()
      this.setState({
        targetRendered: true
      })
    }
  }
  render(){
    return (
      <canvas onClick={this.handleClick} height="242" width="242" ref={e => this.canvas = e} />
    )
  }
}
