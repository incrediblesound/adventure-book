import React, { Component } from 'react';
import styled from 'styled-components'
import { Panel } from '../components/index.jsx'
import { example1, example2 } from './example.js'

const Example = styled.div`
  border: solid 1px #ddd;
  border-radius: 3px;
  padding: 10px;
  margin: 15px 5px;
`
const Expl = styled.p`
  font-weight: 100;
  line-height: 1.5;
`


export default class Examples extends Component {
  render(){
    return (
      <div>
        <p>
          There are different kinds of stories that you can create using this platform. Here are a few examples arranged from simplest to most complex.
        </p>
        <Panel direction="column">
          <Expl>The simplest story consists of a series of numbered pages with options that send the reader to other pages. The special keyword (end) is used to indicate a page with no options. Note that PAGE and OPTION must be capitalized. The dashed line between pages is optional but may help you keep your story organized. Spaces and newlines are ignored except in the quoted text block3.</Expl>
          <Example>
            <pre>{ example1 }</pre>
          </Example>
        </Panel>
        <Panel direction="column">
          <Expl>If you want to include combat, you must add a player at the beginning of your story with all of the attributes shown in the example below. To add a combat challenge to a page user the CHALLENGE keyword followed by the attributes shown in the example, notice that it is required to indicate the challengers weapon but not their armor. You can also add weapon and armor rewards to be offered to the player after they defeat the opponent.</Expl>
          <Example>
            <pre>{ example2 }</pre>
          </Example>
        </Panel>
      </div>
    )
  }
}
