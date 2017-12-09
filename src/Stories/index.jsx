import React, { Component } from 'react';
import styled from 'styled-components';
import { StoryBox, Category, Button, TextLink } from '../components/index.jsx'

const StoryContainer = styled.div`
  font-size: 14px;
`

export default class Browse extends Component {
  componentWillMount(){
    this.state = {
      author: null
    }
    const { session } = this.props
    session.fetchStories()
  }
  setAuthor(author){
    const { session } = this.props
    session.fetchStories('author', author)
    this.setState({ author })
  }
  clearAuthor = (author) => {
    const { session } = this.props
    session.fetchStories()
    this.setState({ author: null })
  }
  renderStories(){
    const { session } = this.props
    return session.get('stories', []).map((story, i) => {
      const { author, title, _id } = story
      return (
        <StoryBox>
          <a href={`#view/${_id}`} key={`${title}-${i}`}>
            {title || 'error'}
          </a>
          <span> - by author <TextLink onClick={() => this.setAuthor(author)}>{author}</TextLink></span>
          <Category>{` ${story.category} `}</Category>
          <p>{story.description || 'NO DESCRIPTION'}</p>
        </StoryBox>
      )
    })
  }
  render(){
    const { navigate } = this.props
    const { author } = this.state
    const title = author ? `Adventures by ${author}` : `All Adventures`
    return (
      <div>
        <StoryContainer>
          <h2>{title}</h2>
          { author && <Button color="gray" onClick={this.clearAuthor}>All Adventures</Button>}
          {this.renderStories()}
        </StoryContainer>
      </div>
    )
  }
}
