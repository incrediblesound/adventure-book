import React, { Component } from 'react'
import compiler from 'story-parser'
import styled from 'styled-components'
import { Title, Story, Button, InlineHeader } from '../components/index.jsx'

const InputGroup = styled.div`
  margin: 5px;
  text-transform: uppercase;
  display: block;
`

const Error = styled.p`
  color: #FF4136;
`

export const categories = [
  'sci-fi', 'fantasy', 'mystery', 'horror', 'historical', 'over-18', 'humor', 'adventure'
]

export default class Create extends Component {
  constructor(){
    super()
    this.state = {
      title: '',
      text: '',
      category: null,
      error: false
    }
  }
  componentWillMount(){
    const { session } = this.props
    // if(!session.isAuthenticated()){
    //   this.props.navigate('login')
    // }
  }
  submit = () => {
    const { text, title } = this.state
    const [story, newText, error] = compiler(this.state.text)
    if (error) {
      this.setState({ error })
    } else if (!title) {
      this.setState({ error: 'You are required to provide a title for your story.' })
    } else {
      this.props.session.saveStory(text, title, category)
        .then(response => {
          const { data } = response
          if(!data.success){
            this.setState({ error: data.reason })
          } else {
            this.props.navigate('home')
          }
        })
    }
  }
  selectCategory(category){
    this.setState({ category })
  }
  renderCategories(){
    return [<InlineHeader>Category:</InlineHeader>].concat(categories.map(category => (
      <Button
        active={ this.state.category === category }
        color="gray"
        onClick={() => this.selectCategory(category)}
      >
        {category}
      </Button>
    )))
  }
  render(){
    const { error, title, text } = this.state
    const { navigate } = this.props

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
            rows={30}
            cols={50}
            value={text}
            placeholder="STORY"
            onChange={(e) => this.setState({ text: e.target.value })}
          />
        </InputGroup>
        <Error>{error || ''}</Error>
        <Button color="green" size="large" onClick={this.submit}>Submit</Button>
        <Button color="blue" size="medium" onClick={() => navigate('examples')}>Learn from Examples</Button>
      </div>
    )
  }
}
