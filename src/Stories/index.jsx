import React, { Component } from 'react';
import styled from 'styled-components';
import Header from '../Header/index.jsx';

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
        <Header session={session} navigate={navigate} />
        <StoryContainer>
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
