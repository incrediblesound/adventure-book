import React, { Component } from 'react';
import compiler from 'story-parser'
import styled from 'styled-components'

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
      error: false
    }
  }
  componentWillMount(){
    const { session } = this.props
    if(!session.isAuthenticated()){
      this.props.navigate('login')
    }
  }
  submit = () => {
    const { text, title } = this.state
    const [story, newText, error] = compiler(this.state.text)
    if (error) {
      this.setState({ error })
    } else if (!title) {
      this.setState({ error: 'You are required to provide a title for your story.' })
    } else {
      this.props.session.saveStory(text, title)
        .then(response => {
          if(!response.success){
            this.setState({ error: response.reason })
          } else {
            this.props.navigate('home')
          }
        })
    }
  }
  render(){
    const { error, title, text } = this.state

    return (
      <div>
        <InputGroup>
          <label>Title</label>
          <input value={title} onChange={(e) => this.setState({ title: e.target.value })}/>
        </InputGroup>
        <InputGroup>
          <label>Text</label>
          <textarea
            rows={30}
            cols={50}
            value={text}
            onChange={(e) => this.setState({ text: e.target.value })}
          />
        </InputGroup>
        <Error>{error || ''}</Error>
        <button onClick={this.submit}>Submit</button>
      </div>
    )
  }
}
