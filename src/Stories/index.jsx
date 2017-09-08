import React, { Component } from 'react';
import styled from 'styled-components';
import { StoryBox, Category } from '../components/index.jsx'

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
        <StoryBox>
          <a href={`#view/${story._id}`} key={`${story.title}-${i}`}>
            {story.title || 'error'}
          </a>
          <span> - by {story.author}</span>
          <Category>{story.category || 'NO CATEGORY'}</Category>
          <p>{story.description || 'NO DESCRIPTION'}</p>
        </StoryBox>
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
