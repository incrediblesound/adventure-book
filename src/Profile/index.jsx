import React, { Component } from 'react';
import styled from 'styled-components';

const StoryContainer = styled.div`
  font-size: 14px;
`

const NewStory = styled.button`
  width: 100px;
  background-color: #90EE90;
  margin: 20px 20px 20px 0px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`

const EditButton = styled.button`
  width: auto;
  background-color: #00BFFF;
  margin: 0px 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`

export default class Browse extends Component {
  componentWillMount(){
    const { session } = this.props
    session.fetchStories('author', session.getUsername())
  }
  renderStories(){
    const { session } = this.props
    return session.get('stories', []).map((story, i) => {
      return (
        <div>
          <a href={`#view/${story._id}`} key={`${story.name}-${i}`}>
            {story.name || 'error'}
          </a>
          <a href={`#edit/${story._id}`}><EditButton>EDIT</EditButton></a>
        </div>
      )
    })
  }
  render(){
    const { navigate } = this.props
    return (
      <div>
        <StoryContainer>
          <NewStory onClick={() => navigate('create')}>New Story</NewStory>
          {this.renderStories()}
        </StoryContainer>
      </div>
    )
  }
}
