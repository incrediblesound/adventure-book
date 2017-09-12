import React, { Component } from 'react';
import axios from 'axios'
import { Button, Panel, StoryBox } from '../components/index.jsx';
import styled from 'styled-components';

const StoryContainer = styled.div`
  font-size: 14px;
`

export default class Browse extends Component {
  componentDidMount(){
    const { session } = this.props
    session.authenticate().then(() => {
      session.fetchStories('author', session.getUsername())
    })
  }
  publish(story, published){
    const { session } = this.props
    axios.post('/api/story/publish', { id: story._id, published }).then(() => {
      session.fetchStories('author', session.getUsername())
    })
  }
  renderStories(){
    const { session, navigate } = this.props
    const stories = session.get('stories', [])
    if(!stories.length){
      return (
        <p>You don't have any adventures yet! Click on the "new adventure" button above to start creating your first adventure, or go to the <a href="javascript:void(0)" onClick={ () => navigate('examples') }> examples page </a> to learn about the features of AdventureBook.</p>
      )
    } else {
      return (
        <div>
        { stories.map((story, i) => {
            return (
              <StoryBox>
                <a href={`#view/${story._id}`} key={`${story.title}-${i}`}>
                  {story.title || 'error'}
                </a>
                <a href={`#edit/${story._id}`}><Button spaceLeft color="blue">EDIT</Button></a>
                { !story.published && <Button onClick={() => this.publish(story, true)} spaceLeft color="yellow">PUBLISH</Button> }
                { story.published && <Button onClick={() => this.publish(story, false)} spaceLeft color="yellow">UN-PUBLISH</Button> }
              </StoryBox>
            )
          }) }
        </div>
      )
    }

  }
  render(){
    const { navigate } = this.props
    return (
      <div>
        <StoryContainer>
          <Button size="large" color="green" onClick={() => navigate('create')}>+ New Adventure</Button>
          {this.renderStories()}
        </StoryContainer>
      </div>
    )
  }
}
