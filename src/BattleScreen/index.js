import React, {Component} from 'react'
import { Label, Value, Button } from '../components/index.jsx'
import styled from 'styled-components'
import Target from './Target.jsx'
import { challengeStrike, playerStrike } from './combat.js'

const rnd = (n) => Math.floor(Math.random() * n)

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  min-height: 250px;
  width: 100%;
`;

const Countdown = styled.div`
  height: 100px;
  padding: 100px 140px;
  text-align: center;
  baseline: center;
`;

const BattlePanel = styled.div`
   width: 200px;
   margin: 5px 15px;
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

const Player = ({ player, coolDown, playerStrike }) => (
  <BattlePanel>
    <div><Label>Life: </Label><Health value={Math.floor((player.currentHealth/player.health)*100)} /></div>
    <Label>Weapon: <Value>{player.weapons[player.currentWeapon].name}</Value></Label>
    <Label>Armor: <Value>{player.armor}</Value></Label>
    <div style={{ width: coolDown + '%', height: '3px', backgroundColor: coolDown === 100 ? 'green' : 'yellow' }}/>
  </BattlePanel>
)

const Challenge = ({ challenge, coolDown }) => (
  <BattlePanel>
    <div><Label>Life: </Label><Health value={Math.floor((challenge.currentHealth/challenge.health)*100)} /></div>
    <Label>Weapon: <Value>{challenge.weapon}</Value></Label>
    <div style={{ width: coolDown + '%', height: '3px', backgroundColor: coolDown === 100 ? 'green' : 'yellow' }}/>
  </BattlePanel>
)

export default class BattleScreen extends Component {
  constructor({ player, challenge }){
    super()
    challenge.currentHealth = challenge.health
    this.state = {
      player,
      challenge,
      playerLost: false,
      playerCoolDown: 0,
      challengeCoolDown: 0,
      countdown: 3,
      finished: false,
    }
  }
  checkGameConditions(){
    const { player, challenge } = this.state
    if(challenge.currentHealth < 1){
      this.setState({ finished: true })
      this.props.onWin()
    } else if(player.currentHealth < 1){
      this.setState({ finished: true, playerLost: true })
    }
  }
  startCountdown = () => {
    const { countdown } = this.state
    if(countdown){
      setTimeout(() => {
        this.setState({ countdown: countdown - 1 }, this.startCountdown)
      }, 1000)
    } else {
      this.startAnimation()
    }
  }
  playerStrike = () => {
    const { challenge, player } = this.state
    const hit = playerStrike(player, challenge)
    this.setState({
      playerCoolDown: 0
    })
  }
  challengeStrike(){
    const { challenge, player } = this.state
    challengeStrike(player, challenge)
  }
  startAnimation = () => {
    this.checkGameConditions()
    const { playerCoolDown, challengeCoolDown, player, challenge, finished } = this.state

    if(!finished){
      let nextChallengeCoolDown
      if(challengeCoolDown === 100){
        nextChallengeCoolDown = 0
        this.challengeStrike()
      } else {
        nextChallengeCoolDown = challengeCoolDown < 100 ? Math.min(100, challengeCoolDown + challenge.speed) : challengeCoolDown
      }
      if(playerCoolDown === 100){
        this.target.renderTarget()
      }

      const weapon = player.weapons[player.currentWeapon]
      this.setState({
        playerCoolDown: playerCoolDown < 100 ? Math.min(100, playerCoolDown + weapon.speed) : playerCoolDown,
        challengeCoolDown: nextChallengeCoolDown
      })
      requestAnimationFrame(this.startAnimation)
    }
  }
  componentDidMount(){
    this.startCountdown()
  }
  render(){
    const { player, challenge, playerCoolDown, challengeCoolDown, countdown, playerLost } = this.state
    if(countdown){
      return (
        <Wrapper>
          <Countdown>
            <Label size="large">Attacker: <Value>{ challenge.name }</Value></Label>
            <h1>{countdown}</h1>
          </Countdown>
        </Wrapper>
      )
    } else if(playerLost) {
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
      <Wrapper>
        <Player player={player} coolDown={playerCoolDown}/>
        <Challenge challenge={challenge} coolDown={challengeCoolDown} />
        <Target ref={ e => this.target = e} playerStrike={this.playerStrike} />
      </Wrapper>
    )
  }
}
