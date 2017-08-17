import React from 'react'
import { Panel, Label, Value, HighlightLabel } from '../components/index.jsx'
import styled from 'styled-components'

const Frame = styled.div`
  display: inline-block;
  width: auto;
  height: auto;
  border: solid 1px #999;
  border-radius: 10px;
  padding: 5px;
  margin: 5px;
`

const equip = (idx, gameState) => {
  gameState.equip(idx)
}

const Player = ({ player, gameState }) => (
    <Panel>
      <Frame>
      <Label>Total Health: <Value>{'' + player.health}</Value></Label>
      <Label>Current Health: <Value>{'' + player.currentHealth}</Value></Label>
      <Label>Armor: <Value>{player.armor}</Value></Label>
      <Label>Defense: <Value>{'' + player.defense}</Value></Label>
      </Frame>
      {
        player.weapons.map((weapon, idx) => {
          const inUse = player.currentWeapon === idx
          return (
            <Frame>
              <div>
                <Value>{weapon.name}</Value>
                <Label>Attack: <Value>{weapon.attack}</Value></Label>
                <Label>Speed: <Value>{weapon.speed}</Value></Label>
              </div>
              {
                inUse
                  ? <HighlightLabel>Equipped</HighlightLabel>
                  : <button onClick={() => equip(idx, gameState)}>EQUIP</button>
              }
            </Frame>
          )
        })
      }
    </Panel>
  )

export default Player
