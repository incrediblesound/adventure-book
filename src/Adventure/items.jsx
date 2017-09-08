import React from 'react'
import styled from 'styled-components'

import { Value, InlineHeader, Label, Button } from '../components/index.jsx'

const ItemPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 150px;
  border: solid 1px #DDD;
  border-radius: 5px;
  padding: 5px;
  margin: 10px 5px;
`

export const Armor = ({ reward, handleTake }) => {
  return (
    <ItemPanel>
    <InlineHeader>{reward.name}</InlineHeader>
    <Value>{` Defense: ${reward.defense} `}</Value>
    <Button spaceTop color="blue" onClick={() => handleTake(reward)}>Take</Button>
    </ItemPanel>
  )
}

export const Weapon = ({ reward, handleTake }) => {
  return (
    <ItemPanel>
    <InlineHeader>{reward.name}</InlineHeader>
    <Value>{` Attack: ${reward.attack} `}</Value>
    <Value>{` Speed: ${reward.speed} `}</Value>
    <Button spaceTop color="blue" onClick={() => handleTake(reward)}>Take</Button>
    </ItemPanel>
  )
}

export const Item = ({ reward, handleTake }) => {
  return (
    <ItemPanel>
    <InlineHeader>{reward.name}</InlineHeader>
    <Button spaceTop color="blue" onClick={() => handleTake(reward)}>Take</Button>
    </ItemPanel>
  )
}
