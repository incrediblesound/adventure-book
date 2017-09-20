import React from 'react'
import { Panel, Label, Value, HighlightLabel, Button } from '../components/index.jsx'
import styled from 'styled-components'

const Frame = styled.div`
  display: inline-block;
  width: auto;
  height: auto;
  border: solid 1px #999;
  border-radius: 10px;
  padding: 5px 15px;
  margin: 5px;
`

const equip = (idx, gameState) => {
  gameState.equip(idx)
}

export const PlayerItems = ({ player }) => (
  <Panel>
    {
      player.items.map(item => (
        <Frame>
            <Value>{item.name}</Value>
        </Frame>
      ))
    }
  </Panel>
)

const Player = ({ player, gameState }) => (
    <Panel spaceBottom>
      <Frame>
      <Label>Total Health: <Value>{'' + player.health}</Value></Label>
      <Label>Current Health: <Value>{'' + player.currentHealth}</Value></Label>
      <Label>Armor: <Value>{player.armor.name}</Value></Label>
      <Label>Defense: <Value>{`${player.defense + player.armor.defense}`}</Value></Label>
      </Frame>
      {
        player.weapons.map((weapon, idx) => {
          const inUse = player.currentWeapon === idx
          return (
            <Frame>
              <div>
                <Value>{weapon.name}</Value>
                <Label>Damage: <Value>{weapon.damage}</Value></Label>
                <Label>Speed: <Value>{weapon.speed}</Value></Label>
              </div>
              {
                inUse
                  ? <HighlightLabel>Equipped</HighlightLabel>
                  : <Button color="blue" onClick={() => equip(idx, gameState)}>EQUIP</Button>
              }
            </Frame>
          )
        })
      }
    </Panel>
  )

export default Player
