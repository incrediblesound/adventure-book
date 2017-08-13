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
  render(){
    const { session, navigate } = this.props
    return (
      <div>
        <StoryContainer>
          <button onClick={() => navigate('create')}>New Story</button>
          {
            session.get('stories', []).map((story, i) => {
              return <div><a href={`#view/${story._id}`} key={`${story.name}-${i}`}>{story.name || 'error'}</a></div>
            })
          }
        </StoryContainer>
      </div>
    )
  }
}
