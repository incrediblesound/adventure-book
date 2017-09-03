import React, { Component } from 'react';
import { Button, Panel } from '../components/index.jsx';
import styled from 'styled-components';

const StoryContainer = styled.div`
  font-size: 14px;
`

export default class Browse extends Component {
  componentWillMount(){
    const { session } = this.props
    // if(!session.isAuthenticated()){
    //   this.props.navigate('login')
    // }
    session.fetchStories('author', session.getUsername())
  }
  renderStories(){
    const { session } = this.props
    return (
    <Panel>
      {
        session.get('stories', []).map((story, i) => {
          return (
            <div>
              <a href={`#view/${story._id}`} key={`${story.title}-${i}`}>
                {story.title || 'error'}
              </a>
              <a href={`#edit/${story._id}`}><Button color="blue">EDIT</Button></a>
            </div>
          )
        })
      }
    </Panel>
    )

  }
  render(){
    const { navigate } = this.props
    return (
      <div>
        <StoryContainer>
          <Button size="large" color="green" onClick={() => navigate('create')}>New Story</Button>
          {this.renderStories()}
        </StoryContainer>
      </div>
    )
  }
}
