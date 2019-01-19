import React from 'react'
import { Panel, Label, Value, HighlightLabel, Button, colors, FlexRow, FlexColumn } from '../components/index.jsx'
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

const ClickFrame = Frame.extend`
  cursor: pointer;
`

const HealthButton = styled.div`
  background-color: ${colors['dark-green']};
  color: white;
  font-size: 10px;
  padding: 3px;
  margin-left: 4px;
  border-radius: 10px;
  display: inline-block;
`

const equip = (idx, gameState) => {
  gameState.equip(idx)
}

export const PlayerItems = ({ player, gameState }) => (
  <Panel>
    {
      player.items.map(item => {
        if(item.type === 'health'){
          return (
            <ClickFrame onClick={() => gameState.consumeHealthItem(item) }>
              <Value>{item.name}</Value>
              <HealthButton>{`+ ${item.recovery}`}</HealthButton>
            </ClickFrame>
          )
        } else {
          return (
            <Frame>
              <Value>{item.name}</Value>
            </Frame>
          )
        }
      })
    }
  </Panel>
)

const Player = ({ player, gameState }) => (
    <Panel spaceBottom>
    <FlexColumn>
      <FlexRow>
        <Frame>
          <Value>{ player.name }</Value>
          <Label>Total Health: <Value>{'' + player.health}</Value></Label>
          <Label>Current Health: <Value>{'' + player.currentHealth}</Value></Label>
          <Label>Defense: <Value>{'' + player.defense}</Value></Label>
          {
            player.currency.map(currency => {
              return (
              <Label>{`${currency.name}: `}<Value>{currency.amount}</Value></Label>
              )
            })
          }
        </Frame>
      </FlexRow>
      <FlexRow>
        {
          player.armor.map(armor => {
            return (
              <Frame>
                <Label>Armor: <Value>{armor.name}</Value></Label>
                <Label>Defense: <Value>{`+${armor.defense}`}</Value></Label>
              </Frame>
            )
          })
        }
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
      </FlexRow>
    </FlexColumn>
    </Panel>
  )

export default Player
