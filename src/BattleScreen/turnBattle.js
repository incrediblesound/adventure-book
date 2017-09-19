import React, {Component} from 'react'
import { Label, Value, Button, FlexColumn, FlexRow, Panel} from '../components/index.jsx'
import styled from 'styled-components'
import Target from './Target.jsx'
import { challengeStrike, playerStrike } from './combat.js'

const rnd = (n) => Math.floor(Math.random() * n)

const Wrapper = styled.div`
  min-height: 50vh;
  width: 100%;
  padding: 0px 10%;
  transition: opacity 1s ease-out;
  opacity: ${props => props.fade ? '0' : '1' };
`

const Countdown = styled.div`
  height: 100px;
  padding: 100px 140px;
  text-align: center;
  baseline: center;
`

const BattlePanel = styled.div`
   width: 50%;
   margin: 5px 15px;
`

const Log = styled.pre`
  border: solid 1px #999;
  border-radius: 5px;
  margin: 0px;
  background-color: #eee;
  padding: 3px;
  height: 95%;
  width: 50%;
  white-space: pre-wrap;
`

const Health = ({ value }) => {
  let color
  if(value > 50){
     color = 'green'
   } else if(value > 25){
     color = 'yellow'
   } else {
     color = 'red'
   }
  return <div style={{ width: value + '%', height: '20px', backgroundColor: color }} />
}

const Player = ({ player, playerStrike }) => (
  <BattlePanel>
    <div><Label size="large">{player.name}</Label></div>
    <div><Label>Life: <Value>{player.currentHealth}</Value></Label></div>
    <Label>Weapon: <Value>{player.weapons[player.currentWeapon].name}</Value></Label>
    <Label>Damage: <Value>{player.weapons[player.currentWeapon].damage}</Value></Label>
    <Label>Armor: <Value>{player.armor.name}</Value></Label>
    <Label>Defense: <Value>{`${player.defense + player.armor.defense}`}</Value></Label>
  </BattlePanel>
)

const Challenge = ({ challenge }) => (
  <BattlePanel>
    <div><Label size="large">{challenge.name}</Label></div>
    <div><Label>Life: <Value>{challenge.currentHealth}</Value></Label></div>
    <Label>Defense: <Value>{challenge.defense}</Value></Label>
    <Label>Weapon: <Value>{challenge.weapon}</Value></Label>
    <Label>Damage: <Value>{challenge.damage}</Value></Label>
  </BattlePanel>
)

export default class BattleScreen extends Component {
  constructor({ player, challenge }){
    super()
    challenge.currentHealth = challenge.health
    const weapon = player.weapons[player.currentWeapon]
    this.state = {
      player,
      challenge,
      battleLog: `${player.name} is facing ${challenge.name}\n`,
      playerLost: false,
      finished: false,
      isPlayersTurn: weapon.speed > challenge.speed,
    }
  }
  componentDidMount(){
    this.nextTurn()
  }
  checkGameConditions(){
    const { player, challenge, battleLog } = this.state
    if(challenge.currentHealth < 1){
      this.setState({
        finished: true,
        battleLog: `${battleLog}You have defeated ${challenge.name}!\n`
      })
      setTimeout(() => {
        this.props.onWin()
      }, 1000)
    } else if(player.currentHealth < 1){
      this.setState({
        finished: true,
        playerLost: true,
        battleLog: `${battleLog}You have been defeated by ${challenge.name}!\n`
      })
    }
  }
  playerStrike = () => {
    const { challenge, player, battleLog } = this.state
    const { hit, damage } = playerStrike(player, challenge)
    if (hit) {
      challenge.currentHealth -= damage
    }
    const text = hit
      ? `${player.name} strikes ${challenge.name} for ${damage} damage\n`
      : `${player.name} attacks and misses\n`
    this.setState({
      isPlayersTurn: false,
      battleLog: `${battleLog}${text}`
    }, this.nextTurn)
  }
  challengeStrike(){
    const { challenge, player, battleLog } = this.state
    let newLog = battleLog
    if (battleLog.split('\n').length > 5){
      newLog = battleLog.split('\n').slice(3).join('\n')
    }
    const { hit, damage } = challengeStrike(player, challenge)
    if (hit) {
      player.currentHealth -= damage
    }
    const text = hit
      ? `${challenge.name} strikes ${player.name} for ${damage} damage\n`
      : `${challenge.name} attacks and misses\n`
    this.setState({
      isPlayersTurn: true,
      battleLog: `${newLog}${text}`
    }, this.nextTurn)
  }
  nextTurn = () => {
    const { isPlayersTurn, battleLog, challenge } = this.state
    this.checkGameConditions()
    if (!isPlayersTurn) {
      setTimeout(() => {
        this.challengeStrike()
      }, 1000)
    }
  }
  render(){
    const { player, challenge, playerLost, isPlayersTurn, battleLog, finished } = this.state
    const playerAttackNumber = player.attack - challenge.defense
    const challengeAttackNumber = challenge.attack - (player.defense + player.armor.defense)
    if(playerLost) {
      return (
        <Wrapper>
          <Countdown>
            <h3>You were defeated by the { challenge.name }</h3>
            <Button color="green" size="large" onClick={this.props.onLose}>Play Again</Button>
          </Countdown>
        </Wrapper>
      )
    }
    return (
      <Wrapper fade={finished}>
        <FlexColumn height='100%'>
          <FlexRow height='50%'>
            <Player player={player} />
            <Challenge challenge={challenge} />
          </FlexRow>
          <FlexRow height='50%'>
            <Log>{battleLog}</Log>
            <Panel spaceLeft>
            <FlexColumn>
              <Label>{player.name} attack bonus: <Value>{playerAttackNumber}</Value></Label>
              <Label>{challenge.name} attack bonus: <Value>{challengeAttackNumber}</Value></Label>
              {
                isPlayersTurn
                ? <Button color="green" disabled={!isPlayersTurn} onClick={this.playerStrike}>Strike</Button>
                : <p>{challenge.name} is attacking...</p>
              }
            </FlexColumn>
            </Panel>
          </FlexRow>
        </FlexColumn>
      </Wrapper>
    )
  }
}
