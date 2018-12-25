import React, { Component } from 'react';

import Adventure from '../Adventure/'
import styled from 'styled-components'
import { InlineHeader } from '../components/index.jsx'

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
    this.props.session.fetchStory(id)
      .then(response => {
        const { data } = response
        if(data.success){
          this.setState({ gameData: data.story })
        } else {
          this.setState({ error: data.error })
        }
      })
      // .catch(response => {
      //   this.setState({ error: JSON.stringify(response) })
      // })
  }
  renderStory(){
    const { session } = this.props
    const { author, title } = this.state.gameData

    return (
      <div>
        <InlineHeader size="medium">{title}</InlineHeader>
        <span style={{ fontSize: '12px', fontWeight: '700' }}>{` by ${author}`}</span>
        <Adventure
          session={session}
          gameData={this.state.gameData}
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
