import React, { Component } from 'react';
import styled from 'styled-components'
import { Panel } from '../components/index.jsx'

const Expl = styled.p`
  font-weight: 100;
  line-height: 1.5;
`

export default class Examples extends Component {
  render(){
    return (
      <div>
        <Panel direction="column">
          <Expl>AdventureBook is a platform for creating and reading choose your own adventure stories and text games. It features a parser that allows you to use a simple format to create stories and games that other people can play. You can write simple choose your own adventure stories or you can add combat and rewards in the form of weapons and armor.</Expl>
          <Expl>AdventureBook is currently in alpha. Existing features will be improved and new features will be added. If you have questions, comments, bug reports, or ideas for new features, send an email to softwaresutras@gmail.com.</Expl>
        </Panel>
      </div>
    )
  }
}
