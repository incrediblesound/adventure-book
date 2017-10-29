import React, { Component } from 'react';
import styled from 'styled-components'
import { Panel, Button, FlexRow, FlexColumn } from '../components/index.jsx'
import {
  player,
  page,
  option,
  challenge,
  items,
  story,
  drop,
} from './patterns.js'
import Stories from './stories.js'

export const Example = styled.div`
  border: solid 1px #ddd;
  border-radius: 3px;
  padding: 10px;
  margin: 10px 5px;
  pre {
    white-space: pre-wrap;
  }
`
export const Expl = styled.p`
  font-weight: 100;
  line-height: 1.5;
`

const exampleMap = {
  examples: Stories,
  story,
  drop,
  player,
  page,
  option,
  challenge,
  items,
}

const exampleNameMap = {
  examples: 'Story Examples',
  story: 'Complete Story',
  drop: 'Item Drop',
  player: 'Player Stats',
  page: 'Page',
  option: 'Option',
  challenge: 'Challenger',
  items: 'Items and Rewards',
}

export default class Examples extends Component {
  constructor(){
    super()
    this.state = {
      selected: 'examples'
    }
  }
  render(){
    const { selected } = this.state
    const Example = exampleMap[selected]

    return (
      <FlexColumn>
        <p>Select one of the options on the left to learn about the AdventureBook parser.</p>
        <FlexRow>
          <FlexColumn width="15%" style={{ padding: '10px 20px 0px 10px' }}>
            {
              Object.keys(exampleMap).map(key => {
                return (
                  <Button
                    spaceBottom
                    color={selected === key ? 'yellow' : 'blue' }
                    onClick={() => this.setState({ selected: key })}
                  >
                    {exampleNameMap[key]}
                  </Button>
                )
              })
            }
          </FlexColumn>
          <FlexColumn width="85%">
            <Example/>
          </FlexColumn>
        </FlexRow>
      </FlexColumn>
    )
  }
}
