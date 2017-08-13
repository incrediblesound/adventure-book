import React, { Component } from 'react';

import Adventure from '../Adventure/'
import styled from 'styled-components'

const Error = styled.p`
  color: #FF4136;
`

class Story extends Component {
  constructor(){
    super()
    this.state = {
      gameData: null,
      error: null
    }
  }
  componentDidMount(){
    const id = this.props.location.split('/')[1]
    this.props.session.fetchStory(id).then(response => {
      const { data } = response
      if(data.success){
        this.setState({ gameData: data.story })
      } else {
        this.setState({ error: data.error })
      }
    })
  }
  renderStory(){
    const { session, navigate } = this.props
    const { author, name, content } = this.state.gameData

    return (
      <div>
        <h2 style={{ display: 'inline-block', margin: '10px 10px'}}>{name}</h2>
        <span>{`by ${author}`}</span>
        <Adventure
          session={session}
          content={content}
        />
      </div>
    )
  }
  render() {
    const { gameData, error } = this.state
    if(gameData){
      return this.renderStory()
    } else {
      return (
        <div>
          <Error>{error}</Error>
        </div>
      );
    }
  }
}

export default Story
