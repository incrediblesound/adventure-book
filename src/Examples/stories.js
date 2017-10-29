import React, { Component } from 'react';
import styled from 'styled-components'
import { Panel } from '../components/index.jsx'
import { a, b, c, d, e } from './example.js'

import { Example, Expl } from './index.jsx'

export default class Stories extends Component {
  render(){
    return (
      <div>
        <p>
          Here are some story examples arranged from simplest to most complex.
        </p>
        <Panel direction="column">
          <Expl>The simplest story consists of numbered pages with options that send the reader to other pages. This story will read like a choose your own adventure. The example below is as simple as possible: there are two rooms and the user can go back and forth between them.</Expl>
          <Example>
            <pre>{ a }</pre>
          </Example>
        </Panel>
        <Panel direction="column">
          <Expl>Instead of an endless loop, choose your own adventures often have end points where the story ends. To create an ending simple use the keyword (end) like the in example below. When the user reaches an end point they can restart or stop playing.</Expl>
          <Example>
            <pre>{ b }</pre>
          </Example>
        </Panel>
        <Panel direction="column">
          <Expl>You can add items that your player can pick up throughout the story. Items are used to unlock choices. In the example below, you must go in the left door first to get the key before you can go through the right door. The use of dashed lines is optional but helps to separate pages. Notice how page 0 has multiple quoted text blocks. The user must click through each block of text before they get to the options.</Expl>
          <Example>
            <pre>{ c }</pre>
          </Example>
        </Panel>
        <Panel direction="column">
          <Expl>If you want to include combat you must add a player at the beginning of your story. The format of the player information is very specific so I suggest using the "+ player" template button to add the player to your story. To add a combat challenge to a page user the CHALLENGE keyword followed by the attributes shown in the example. Again, the format of the challengers information is very specific, so I suggest using the "+ Page w/ Challenge" template button to ensure your game parses successfully.</Expl>
          <Example>
            <pre>{ d }</pre>
          </Example>
        </Panel>
        <Panel direction="column">
          <Expl>Finally, you can add weapon and armor upgrades to your game. The example below is a simple game where the player can collect gold to buy a suit of armor, then they fight a dragon and win a magic sword. Remember to make sure you either learn the reward item format exactly or use the templates to avoid errors.</Expl>
          <Example>
            <pre>{ e }</pre>
          </Example>
        </Panel>
      </div>
    )
  }
}
