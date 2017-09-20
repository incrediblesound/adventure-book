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

const CenteredBox = styled.div`
  min-height: 100px;
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
      playerSpeed: weapon.speed,
      challengeSpeed: challenge.speed,
      battleLog: `${player.name} is facing ${challenge.name}\n`,
      playerLost: false,
      finished: false,
      isPlayersTurn: weapon.speed >= challenge.speed,
      started: false,
    }
  }
  begin = () => {
    this.setState({
      started: true
    }, this.nextTurn)
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
        battleLog: `${battleLog}You have been defeated by ${challenge.name}!\n`
      })
      setTimeout(() => {
        this.setState({ playerLost: true })
      }, 1000)
    }
  }
  playerStrike = () => {
    const { challenge, player, battleLog, challengeSpeed, playerSpeed } = this.state
    const { hit, damage } = playerStrike(player, challenge)
    if (hit) {
      challenge.currentHealth -= damage
    }
    const text = hit
      ? `${player.name} strikes ${challenge.name} for ${damage} damage\n`
      : `${player.name} attacks and misses\n`
    const nextChallengeSpeed = challengeSpeed + challenge.speed
    this.setState({
      isPlayersTurn: playerSpeed >= nextChallengeSpeed,
      challengeSpeed: nextChallengeSpeed,
      battleLog: `${battleLog}${text}`
    }, this.nextTurn)
  }
  challengeStrike(){
    const { challenge, player, battleLog, challengeSpeed, playerSpeed } = this.state
    let newLog = battleLog
    if (battleLog.split('\n').length > 5){
      newLog = ''
    }
    const { hit, damage } = challengeStrike(player, challenge)
    if (hit) {
      player.currentHealth -= damage
    }
    const text = hit
      ? `${challenge.name} strikes ${player.name} for ${damage} damage\n`
      : `${challenge.name} attacks and misses\n`
    const weapon = player.weapons[player.currentWeapon]
    const nextPlayerSpeed = playerSpeed + weapon.speed
    this.setState({
      isPlayersTurn: nextPlayerSpeed >= challengeSpeed,
      playerSpeed: nextPlayerSpeed,
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
    const {
      player, playerSpeed,
      challenge, challengeSpeed,
      playerLost,
      isPlayersTurn,
      battleLog,
      finished,
      started,
     } = this.state
    const playerAttackNumber = player.attack - challenge.defense
    const challengeAttackNumber = challenge.attack - (player.defense + player.armor.defense)
    if(!started) {
      return (
        <Wrapper>
        <CenteredBox>
          <h3>{ challenge.text }</h3>
          <Button color="gray" size="large" onClick={this.begin}>Start Battle</Button>
        </CenteredBox>
      </Wrapper>
      )
    }
    if(playerLost) {
      return (
        <Wrapper>
          <CenteredBox>
            <h3>You were defeated by the { challenge.name }</h3>
            <Button color="green" size="large" onClick={this.props.onLose}>Play Again</Button>
          </CenteredBox>
        </Wrapper>
      )
    }
    let speed = isPlayersTurn ? player.name : challenge.name
    let time = isPlayersTurn
      ? `+${playerSpeed - challengeSpeed}`
      : `+${challengeSpeed - playerSpeed}`
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
              <Label margin="3px 0px">{player.name} Attack bonus: <Value>{playerAttackNumber}</Value></Label>
              <Label margin="3px 0px">{challenge.name} Attack bonus: <Value>{challengeAttackNumber}</Value></Label>
              <Label margin="3px 0px 10px 0px">Speed advantage: <Value>{speed} {time}</Value></Label>
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
