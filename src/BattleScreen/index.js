import React, {Component} from 'react';
import styled from 'styled-components'

const rnd = (n) => Math.floor(Math.random() * n)

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Countdown = styled.div`
  height: 300px;
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
    <div>Life: <Health value={Math.floor((player.currentHealth/player.health)*100)} /></div>
    <p>{`Weapon: ${player.weapon}`}</p>
    <p>{`Armor: ${player.armor}`}</p>
    <div style={{ width: coolDown + '%', height: '3px', backgroundColor: coolDown === 100 ? 'green' : 'yellow' }}/>
    { coolDown == 100 &&
      <button style={{ margin: '20px 0px', width: '100%'}} onClick={() => playerStrike()}>ATTACK</button>
    }
  </BattlePanel>
)

const Challenge = ({ challenge, coolDown }) => (
  <BattlePanel>
    <div>Life: <Health value={Math.floor((challenge.currentHealth/challenge.health)*100)} /></div>
    <p>{`Weapon: ${challenge.weapon}`}</p>
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
    const weapon = player.weapons[player.currentWeapon]
    challenge.currentHealth -= weapon.attack
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
    const { player, challenge, playerCoolDown, challengeCoolDown, countdown } = this.state
    if(countdown){
      return (
        <Wrapper>
          <Countdown>
            <h1>{countdown}</h1>
          </Countdown>
        </Wrapper>
      )
    }
    return (
      <Wrapper>
        <Player player={player} coolDown={playerCoolDown} playerStrike={this.playerStrike}/>
        <Challenge challenge={challenge} coolDown={challengeCoolDown} />
      </Wrapper>
    )
  }
}
