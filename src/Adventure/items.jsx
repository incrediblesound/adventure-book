import React from 'react'
import styled from 'styled-components'

import { Value, InlineHeader, Label, Button } from '../components/index.jsx'

const ItemPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 150px;
  border: solid 2px #DDD;
  border-radius: 5px;
  padding: 5px;
  margin: 10px 5px;
`

export const Recovery = ({ handleClick }) => (
  <ItemPanel>
    <InlineHeader>Recover Health</InlineHeader>
    <Button spaceTop color="green" onClick={handleClick}>Heal</Button>
  </ItemPanel>
)

export const Armor = ({ reward, handleTake, canAfford }) => {
  return (
    <ItemPanel>
    <InlineHeader>{reward.name}</InlineHeader>
    <Value>{` Defense: ${reward.defense} `}</Value>
    { reward.cost 
      ? <Value>{` Cost: ${reward.cost.name} ${reward.cost.amount} `}</Value>
      : null
    }
    <Button disabled={!canAfford} spaceTop color="blue" onClick={() => handleTake(reward)}>Take</Button>
    </ItemPanel>
  )
}

export const Weapon = ({ reward, handleTake, canAfford }) => {
  return (
    <ItemPanel>
    <InlineHeader>{reward.name}</InlineHeader>
    <Value>{` Damage: ${reward.damage} `}</Value>
    <Value>{` Speed: ${reward.speed} `}</Value>
    { reward.cost 
      ? <Value>{` Cost: ${reward.cost.name} ${reward.cost.amount} `}</Value>
      : null
    }
    <Button disabled={!canAfford} spaceTop color="blue" onClick={() => handleTake(reward)}>Take</Button>
    </ItemPanel>
  )
}

export const Item = ({ reward, handleTake, canAfford }) => {
  return (
    <ItemPanel>
    <InlineHeader>{reward.name}</InlineHeader>
    <Button disabled={!canAfford} spaceTop color="blue" onClick={() => handleTake(reward)}>Take</Button>
    </ItemPanel>
  )
}

export const HealthItem = ({ reward, handleTake, canAfford }) => {
  return (
    <ItemPanel>
    <InlineHeader>{`${reward.name} (Health +${reward.recovery})`}</InlineHeader>
    { reward.cost 
      ? <Value>{` Cost: ${reward.cost.name} ${reward.cost.amount} `}</Value>
      : null
    }
    <Button disabled={!canAfford} spaceTop color="blue" onClick={() => handleTake(reward)}>Take</Button>
    </ItemPanel>
  )
}

export const Currency = ({ reward, handleTake }) => {
  return (
    <ItemPanel>
    <InlineHeader>{`${reward.name}: ${reward.amount}`}</InlineHeader>
    <Button spaceTop color="yellow" onClick={() => handleTake(reward)}>Take</Button>
    </ItemPanel>
  )
}
