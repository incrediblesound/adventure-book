import React, { Component } from 'react'
import parser from 'story-parser'
import styled from 'styled-components'
import { Title, Story, Button, InlineHeader } from '../components/index.jsx'
import { categories } from './constants.js'
import * as templates from './templates'
import validate, { getLastPage} from './validateStory'
import { Example } from '../Examples/index.jsx'

export const Panels = styled.div`
  display: flex;
  flex-direction: row;
`

export const TemplatePanel = styled.div`
  margin-left: 30px;
  margin-top: 10px;
  padding: 5px;
  height: 500px;
  overflow-x: scroll;
`


const InputGroup = styled.div`
  margin-top: 5px;
  margin-bottom: 0px;
  text-transform: uppercase;
  display: block;
`

const Error = styled.p`
  color: #FF4136;
`

const storyMessage = `STORY: Use the template buttons at the bottom to help you build syntactically correct stories. Stories must follow an exact format to avoid parser errors.
 Make sure to save frequently, you can edit and play your own adventure before you make it public.`

export default class Create extends Component {
  constructor(){
    super()
    this.state = {
      title: '',
      text: '',
      description: '',
      category: null,
      error: false
    }
  }
  componentWillMount(){
    const { session } = this.props
    session.authenticate()
  }
  addTemplate(type){
    if(!this.state.text){
      const template = templates[type]
      return this.setState({
        text: `${this.state.text}${template(0)}`
      })
    } else {
      const story = parser(this.state.text)
      if(story.error){
        this.setState({ error })
      } else if (!story.pages.length) {
        const template = templates[type]
        this.setState({
          text: `${this.state.text}${template(0)}`
        })
      } else {
        const numPages = getLastPage(story)
        const template = templates[type]
        this.setState({
          text: `${this.state.text}${template(numPages+1)}`
        })
      }
    }
  }
  submit = () => {
    const { text, title, category, description } = this.state
    let content = text
    // const parserResult = parser(this.state.text)
    // const storyError = parserResult.result && validate(result)
    // if (parserResult.error || storyError) {
    //   if (parserResult.error) {
    //     let first = text.substring(0, content.length - parserResult.text.length)
    //     let second = text.substring(content.length - parserResult.text.length)
    //     content = first + '>---{{ ERROR }}---->' + second
    //   }
    //   this.setState({ error: error || storyError, text: content })
    // } else if (!title) {
    //   this.setState({ error: 'You are required to provide a title for your adventure.' })
    // } else if (!category) {
    //   this.setState({ error: 'You must chose a category for your adventure.'})
    // } else {
    this.props.session.saveStory({ content, title, category, description })
      .then(response => {
        const { data } = response
        if(!data.success){
          const errorMsg = typeof data.reason === 'string' ? data.reason : data.reason.errors.category.message
          this.setState({ error: errorMsg })
        } else {
          this.props.navigate('profile')
        }
      })
    // }
  }
  renderCategories(){
    return [<InlineHeader>Category:</InlineHeader>].concat(categories.map(category => (
      <Button
        spaceLeft
        active={ this.state.category === category }
        color="gray"
        onClick={() => this.setState({ category })}
      >
        {category}
      </Button>
    )))
  }
  render(){
    const { error, title, text, description } = this.state
    const { navigate } = this.props
    const dirty = !!(title || text || description)
    return (
      <Panels>
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
              rows={1}
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
              placeholder={storyMessage}
              onChange={(e) => this.setState({ text: e.target.value })}
            />
          </InputGroup>
          <Error>{error || ''}</Error>
          <Button spaceRight color="green" size="large" onClick={this.submit}>Save</Button>
          <Button color="blue" size="medium" onClick={() => navigate('examples', dirty)}>Learn from Examples</Button>
          <Button color="gray" title="Player information must be first in your story" spaceLeft onClick={() => this.addTemplate('player')}>+ Player</Button>
          <Button color="gray" title="A simple page" spaceLeft onClick={() => this.addTemplate('page')}>+ Page</Button>
          <Button color="gray" title="A page with an item" spaceLeft onClick={() => this.addTemplate('item')}>+ Page w/ Item</Button>
          <Button color="gray" title="A page with combat" spaceLeft onClick={() => this.addTemplate('challenge')}>+ Page w/ Challenge</Button>
          <Button color="gray" title="A page with combat and rewards" spaceLeft onClick={() => this.addTemplate('rewards')}>+ Challenge & Reward</Button>
        </div>
        <TemplatePanel>
          {
            Object.keys(templates).map(key => {
              let template = templates[key]
              return (
                <Example>
                  <pre>{ template(1) }</pre>
                </Example>
              )
            })
          }
        </TemplatePanel>
      </Panels>
    )
  }
}
