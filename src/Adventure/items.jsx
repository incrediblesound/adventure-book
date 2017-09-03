import React from 'react'
import styled from 'styled-components'

const TakeReward = styled.button`
  width: auto;
  background-color: #7FDBFF;
  margin: 0px 5px;
  border: 1px solid #666;
  border-radius: 5px;
  &:hover {
    background-color: #0074D9;
    color: white;
  }
  cursor: pointer;
  padding: 5px;

`

const ItemName = styled.p`
  border: solid 1px #666;
  border-radius: 5px;
  display: inline-block;
  padding: 3px;
`

export const Armor = ({ reward, handleTake }) => {
  return (
    <div>
    <ItemName>{reward.name}</ItemName>
    <span>{` Defense: ${reward.defense} `}</span>
    <TakeReward onClick={() => handleTake(reward)}>Take</TakeReward>
    </div>
  )
}

export const Weapon = ({ reward, handleTake }) => {
  return (
    <div>
    <ItemName>{reward.name}</ItemName>
    <span>{` Attack: ${reward.attack} `}</span>
    <span>{` Speed: ${reward.speed} `}</span>
    <TakeReward onClick={() => handleTake(reward)}>Take</TakeReward>
    </div>
  )
}
