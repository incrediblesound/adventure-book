import React, { Component } from 'react';
import parser from 'story-parser'
import styled from 'styled-components'
import { Title, Story, Button, InlineHeader } from '../components/index.jsx'
import { categories } from '../Create/constants.js'
import * as templates from '../Create/templates'

const InputGroup = styled.div`
  margin: 5px;
  text-transform: uppercase;
  display: block;
`

const Error = styled.p`
  color: #FF4136;
`

export default class Create extends Component {
  constructor(){
    super()
    this.state = {
      title: '',
      text: '',
      description: '',
      category: null,
      error: false,
      id: null
    }
  }
  componentWillMount(){
    const { session } = this.props
    session.authenticate()
  }
  componentDidMount(){
    const id = this.props.location.split('/')[1]
    this.props.session.fetchStory(id).then(response => {
      const { data } = response
      if(data.success){
        const { author, title, category, description, content, _id } = data.story
        this.setState({
          title,
          description,
          category,
          text: content,
          id: _id,
        })
      } else {
        this.setState({ error: data.error })
      }
    })
  }
  renderCategories(){
    return [<InlineHeader>Category:</InlineHeader>].concat(categories.map(category => (
      <Button
        spaceLeft
        active={ this.state.category === category }
        color="gray"
        onClick={() => this.selectCategory(category)}
      >
        {category}
      </Button>
    )))
  }
  submit = () => {
    const { text, title, category, description } = this.state
    const { result, error } = parser(this.state.text)
    if (error) {
      this.setState({ error })
    } else if (!title) {
      this.setState({ error: 'You are required to provide a title for your adventure.' })
    } else if (!category) {
      this.setState({ error: 'You must chose a category for your adventure.'})
    } else {
      this.props.session.updateStory({ content: text, title, category, description })
        .then(response => {
          const { data } = response
          if(!data.success){
            const errorMsg = typeof data.reason === 'string' ? data.reason : data.reason.errors.category.message
            this.setState({ error: errorMsg })
          } else {
            this.props.navigate('profile')
          }
        })
    }
  }
  addTemplate(type){
    const template = templates[type]
    this.setState({
      text: `${this.state.text}${template}`
    })
  }
  render(){
    const { error, title, text, description } = this.state

    return (
      <div>
      <InputGroup>
        { this.renderCategories() }
      </InputGroup>
        <InputGroup>
          <Title
            value={title}
            placeholder="TITLE"
            onChange={(e) => this.setState({ title: e.target.value })}
          />
        </InputGroup>
        <InputGroup>
          <Story
            rows={3}
            cols={50}
            value={description}
            placeholder="DESCRIPTION"
            onChange={(e) => this.setState({ description: e.target.value })}
          />
        </InputGroup>
        <InputGroup>
          <Story
            rows={30}
            cols={50}
            value={text}
            placeholder="STORY"
            onChange={(e) => this.setState({ text: e.target.value })}
          />
        </InputGroup>
        <Error>{error || ''}</Error>
        <Button spaceRight color="green" size="large" onClick={this.submit}>Save</Button>
        <Button color="gray" title="Player information must be first in your story" spaceLeft onClick={() => this.addTemplate('player')}>+ Player</Button>
        <Button color="gray" title="A simple page" spaceLeft onClick={() => this.addTemplate('page')}>+ Page</Button>
        <Button color="gray" title="A page with an item" spaceLeft onClick={() => this.addTemplate('item')}>+ Page w/ Item</Button>
        <Button color="gray" title="A page with combat" spaceLeft onClick={() => this.addTemplate('challenge')}>+ Page w/ Challenge</Button>
        <Button color="gray" title="A page with combat and rewards" spaceLeft onClick={() => this.addTemplate('rewards')}>+ Challenge & Reward</Button>
      </div>
    )
  }
}
