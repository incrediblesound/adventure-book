import React, { Component } from 'react';

import Adventure from '../Adventure/'
import styled from 'styled-components'
import Header from '../Header/index.jsx';

const Error = styled.p`
  color: #FF4136;
`

class Story extends Component {
  constructor(){
    super()
    this.state = {
      story: null,
      error: null
    }
  }
  componentDidMount(){
    const id = this.props.location.split('/')[1]
    this.props.session.fetchStory(id).then(response => {
      const { data } = response
      if(data.success){
        this.setState({ story: data.story })
      } else {
        this.setState({ error: data.error })
      }
    })
  }
  renderStory(){
    const { author, name, content } = this.state.story
    const { session, navigate } = this.props

    return (
      <div>
        <h2>{name}</h2>
        <span>{`by ${author}`}</span>
        <Adventure
          story={content}
        />
      </div>
    )
  }
  render() {
    const { story, error } = this.state
    if(story){
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
