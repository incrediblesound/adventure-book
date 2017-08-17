import React, { Component } from 'react';
import styled from 'styled-components';
const StoryContainer = styled.div`
  font-size: 14px;
`

export default class Browse extends Component {
  componentWillMount(){
    const { session } = this.props
    session.fetchStories()
  }
  renderStories(){
    const { session } = this.props
    return session.get('stories', []).map((story, i) => {
      return (
        <div>
          <a href={`#view/${story._id}`} key={`${story.name}-${i}`}>
            {story.name || 'error'}
          </a>
          <span> - by {story.author}</span>
        </div>
      )
    })
  }
  render(){
    const { navigate } = this.props
    return (
      <div>
        <StoryContainer>
          <h2>New Stories</h2>
          {this.renderStories()}
        </StoryContainer>
      </div>
    )
  }
}
