import React, {Component} from 'react';
import styled from 'styled-components'

const rnd = (n) => Math.floor(Math.random() * n)

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Countdown = styled.div`
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  baseline: center;
`;

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
  <div style={{ width: '200px' }}>
    <div>Life: <Health value={Math.floor((player.currentHealth/player.health)*100)} /></div>
    <p>{`Weapon: ${player.weapon}`}</p>
    <p>{`Armor: ${player.armor}`}</p>
    <div style={{ width: coolDown + '%', height: '3px', backgroundColor: coolDown === 100 ? 'green' : 'yellow' }}/>
    { coolDown == 100 &&
      <button style={{ margin: '20px 0px', width: '100%'}} onClick={() => playerStrike()}>ATTACK</button>
    }
  </div>
)

const Challenge = ({ challenge, coolDown }) => (
  <div style={{ width: '200px' }}>
    <div>Life: <Health value={Math.floor((challenge.currentHealth/challenge.health)*100)} /></div>
    <p>{`Weapon: ${challenge.weapon}`}</p>
    <div style={{ width: coolDown + '%', height: '3px', backgroundColor: coolDown === 100 ? 'green' : 'yellow' }}/>
  </div>
)

export default class BattleScreen extends Component {
  constructor({ player, challenge }){
    super()
    challenge.currentHealth = challenge.health
    this.state = {
      player,
      challenge,
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
      this.setState({ finished: true })
      this.props.onLose()
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
    challenge.currentHealth -= player.attack
    this.setState({
      playerCoolDown: 0
    })
  }
  challengeStrike(){
    setTimeout(() => {
      const { challenge, player } = this.state
      player.currentHealth -= challenge.attack
    }, rnd(500))
  }
  startAnimation = () => {
    this.checkGameConditions()
    const { playerCoolDown, challengeCoolDown, player, challenge, finished } = this.state
    let nextChallengeCoolDown
    if(challengeCoolDown === 100){
      nextChallengeCoolDown = 0
      this.challengeStrike()
    } else {
      nextChallengeCoolDown = challengeCoolDown < 100 ? Math.min(100, challengeCoolDown + challenge.speed) : challengeCoolDown
    }
    if(!finished){
      this.setState({
        playerCoolDown: playerCoolDown < 100 ? Math.min(100, playerCoolDown + player.speed) : playerCoolDown,
        challengeCoolDown: nextChallengeCoolDown
      })
      requestAnimationFrame(this.startAnimation)
    }
  }
  componentDidMount(){
    this.startCountdown()
  }
  render(){
    const { player, challenge, playerCoolDown, challengeCoolDown, countdown } = this.state
    if(countdown){
      return <Countdown><h1>{countdown}</h1></Countdown>
    }
    return (
      <Wrapper>
        <Player player={player} coolDown={playerCoolDown} playerStrike={this.playerStrike}/>
        <Challenge challenge={challenge} coolDown={challengeCoolDown} />
      </Wrapper>
    )
  }
}
