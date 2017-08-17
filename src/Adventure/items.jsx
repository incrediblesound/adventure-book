import React from 'react'
import styled from 'styled-components'

const TakeReward = styled.button`
  width: auto;
  background-color: #00BFFF;
  margin: 0px 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
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
