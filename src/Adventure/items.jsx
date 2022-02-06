import React from 'react'
import styled from 'styled-components'

import { Value, InlineHeader, Button } from '../components/index.jsx'

const ItemPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 150px;
  border: solid 2px #DDD;
  border-radius: 5px;
  padding: 5px;
  margin: 10px 5px;
`

export const Recovery = ({ handleClick }) => (
  <ItemPanel>
    <h2 className="inline-header">Recover Health</h2>
    <Button spaceTop color="green" onClick={handleClick}>Heal</Button>
  </ItemPanel>
)

export const Armor = ({ reward, handleTake, canAfford }) => {
  const verb = reward.cost
    ? 'Buy'
    : 'Take'
  return (
    <ItemPanel>
    <h2 className="inline-header">{reward.name}</h2>
    <Value>{` Defense: ${reward.defense} `}</Value>
    { reward.cost 
      ? <Value>{` Cost: ${reward.cost.name} ${reward.cost.amount} `}</Value>
      : null
    }
    <Button disabled={!canAfford} spaceTop color="blue" onClick={() => handleTake(reward)}>{ verb }</Button>
    </ItemPanel>
  )
}

export const Weapon = ({ reward, handleTake, canAfford }) => {
  const verb = reward.cost
    ? 'Buy'
    : 'Take'
  return (
    <ItemPanel>
    <h2 className="inline-header">{reward.name}</h2>
    <Value>{` Damage: ${reward.damage} `}</Value>
    <Value>{` Speed: ${reward.speed} `}</Value>
    { reward.cost 
      ? <Value>{` Cost: ${reward.cost.name} ${reward.cost.amount} `}</Value>
      : null
    }
    <Button disabled={!canAfford} spaceTop color="blue" onClick={() => handleTake(reward)}>{ verb }</Button>
    </ItemPanel>
  )
}

export const Item = ({ reward, handleTake, canAfford }) => {
  const verb = reward.cost
    ? 'Buy'
    : 'Take'
  return (
    <ItemPanel>
    <h2 className="inline-header">{reward.name}</h2>
    <Button disabled={!canAfford} spaceTop color="blue" onClick={() => handleTake(reward)}>{ verb }</Button>
    </ItemPanel>
  )
}

export const HealthItem = ({ reward, handleTake, canAfford }) => {
  const verb = reward.cost
    ? 'Buy'
    : 'Take'
  return (
    <ItemPanel>
    <h2 className="inline-header">{`${reward.name} (Health +${reward.recovery})`}</h2>
    { reward.cost 
      ? <Value>{` Cost: ${reward.cost.name} ${reward.cost.amount} `}</Value>
      : null
    }
    <Button disabled={!canAfford} spaceTop color="blue" onClick={() => handleTake(reward)}>{ verb }</Button>
    </ItemPanel>
  )
}

export const Currency = ({ reward, handleTake }) => {
  return (
    <ItemPanel>
    <h2 className="inline-header">{`${reward.name}: ${reward.amount}`}</h2>
    <Button spaceTop color="yellow" onClick={() => handleTake(reward)}>Take</Button>
    </ItemPanel>
  )
}
