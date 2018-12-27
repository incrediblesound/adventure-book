import React, {Component} from 'react';
import parser from 'story-parser'
import styled from 'styled-components'
import BattleScreen from '../BattleScreen/turnBattle.js'
import { Weapon, Armor, Item, Recovery, HealthItem, Currency } from './items.jsx'
import { Panel, Button, colors, FlexRow, ErrorText } from '../components/index.jsx'
import Player, { PlayerItems } from './Player.jsx'
import { rndDown } from '../utilities.js'

const StoryText = styled.p`
  font-size: 18px;
  font-weight: 300;
  line-height: 1.5;
  font-family: 'Merriweather', serif;
`;

const Choice = styled.div`
  width: auto;
  border: solid 1px #AAA;
  padding: 5px 10px;
  border-radius: 15px;
  cursor: pointer;
  user-select: none;
  color: ${ props => props.disabled ? '#666' : 'black'};
  margin: 10px;
  &:hover {
    background-color: ${ props => props.disabled ? 'white' : '#EEE'};
  }
  p {
    margin: 0;
  }
`

const Continue = styled.a`
  cursor: pointer;
  font-size: 18px;
`

const ErrorScreen = () => (
  <Panel>
    <ErrorText>This story has errors and can not be loaded</ErrorText>
  </Panel>
)

const rewardComponent = (reward, gameState, key) => {
  let canAfford = true
  if (reward.cost) {
    const playersMoney = gameState.player.currency.filter(currency => currency.name === reward.cost.name).pop()
    if (!playersMoney || playersMoney.amount < reward.cost.amount) {
      canAfford = false
    }
  }
  switch (reward.type) {
    case 'currency':
      return <Currency reward={reward} handleTake={() => gameState.takeItem(key)} />
    case 'weapon':
      return <Weapon reward={reward} canAfford={canAfford} handleTake={() => gameState.takeItem(key)} />
    case 'armor':
      return <Armor reward={reward} canAfford={canAfford} handleTake={() => gameState.takeItem(key)} />
    case 'key':
      return <Item reward={reward} canAfford={canAfford} handleTake={() => gameState.takeItem(key)} />
    case 'health':
      return <HealthItem reward={reward} canAfford={canAfford} handleTake={() => gameState.takeItem(key)} />
    case 'hidden':
      gameState.takeHiddenItem(key)
      return <noscript />
    default:
      return <noscript />
  }
}

class App extends Component {
  constructor({ gameData, session }){
    super()
    const game = parser(gameData.content)
    let section = null;

    if (game) {
      section = game.pages.filter(section => section.id === 0)[0]
      session.startStory(gameData, game)
    }

    this.state = {
      game,
      textIndex: 0,
      currentSectionId: 0,
      currentSection: section,
      player: game && session.gameState.player,
      sectionMeta: game && session.gameState.getMetaForSection(section),
    }
  }
  unlockOption = (option) => {
    const selectedOption = option.target
    const { sectionMeta } = this.state
    const { gameState } = this.props.session
    sectionMeta.options[option.target].isLocked = false
    gameState.usePlayerItem(option.lock)
    this.handleGo(selectedOption)
  }
  handleGo = (selectedOption) => {
    const { session } = this.props
    const { game } = this.state
    const section = game.pages.filter(section => section.id === selectedOption)[0]
    session.gameState.updateSection(selectedOption)
    this.setState({
      currentSection: section,
      textIndex: 0,
      sectionMeta: session.gameState.getMetaForSection(section),
      currentSectionId: selectedOption,
      selectedOption: null
    })
  }
  restart = () => {
    const { session } = this.props
    const { game } = this.state
    session.startStory(game)
    const section = game.pages.filter(section => section.id === 0)[0]

    this.setState({
      currentSectionId: 0,
      textIndex: 0,
      currentSection: section,
      player: session.gameState.player,
      sectionMeta: session.gameState.getMetaForSection(section),
    })
  }
  playerWin = () => {
    this.state.sectionMeta.challengePassed = true
    this.props.session.update()
  }
  renderBattle(){
    const { player, currentSection } = this.state
    const { text, challenges } = currentSection
    const challenge = challenges[0] // for now only supporting one opponent
    return (
      <BattleScreen
        player={player}
        session={this.props.session}
        challenge={challenge}
        onWin={this.playerWin}
        onLose={this.restart}
      />
    )
  }
  recoverHealth = () => {
    const { sectionMeta } = this.state
    this.props.session.gameState.recoverHealth()
    sectionMeta.hasHealthRecovery = false

  }
  renderRewards(){
    const { sectionMeta, game } = this.state
    const { gameState } = this.props.session
    const keys = Object.keys(sectionMeta.rewards)
    if(!keys.length && !sectionMeta.hasHealthRecovery){
      return <div style={{ height: '45px' }} />
    }
    let recovery = []
    if (sectionMeta.hasHealthRecovery) {
      recovery.push(
        <Recovery handleClick={this.recoverHealth} />
      )
    }
    const rewards = recovery.concat(keys.map(key => {
      const reward = sectionMeta.rewards[key]
      if (reward.obtained) return <noscript />
      // if (reward.type === 'drop') {
      //   const possibleRewards = game.drops[reward.name]
      //   const randomReward = possibleRewards[ rndDown(possibleRewards.length) ]
      //   return rewardComponent(randomReward, gameState, key)
      // }
      return rewardComponent(reward, gameState, key)
    }))
    
    return rewards
  }
  renderOptions(options) {
    const { gameState } = this.props.session
    const { sectionMeta } = this.state
    if(sectionMeta.isEnd){
      return (
        <Button color="green" size="large" onClick={() => this.restart()}>Start Over</Button>
      )
    }
    return options.map(option => {
      const hasLock = !!option.lock
      const isLocked = sectionMeta.options[option.target].isLocked
      if (hasLock && isLocked && !gameState.playerHasItem(option.lock)) {
        return (
          <Choice disabled>
            <p>{`${option.text} (requires ${option.lock})`}</p>
          </Choice>
        )
      } else if (hasLock && isLocked && gameState.playerHasItem(option.lock)){
        return (
          <Choice onClick={() => this.unlockOption(option)}>
            <p>{`${option.text} (use ${option.lock})`}</p>
          </Choice>
        )
      } else if (!option.condition || (option.condition && gameState.playerHasHiddenItem(option.condition))) {
        return (
          <Choice onClick={() => this.handleGo(option.target)}>
          <p>{`${option.text}`}</p>
          </Choice>
        )
      } else {
        return <noscript />
      }
    })
  }
  renderChoice(){
    const { player, currentSection, challenge, textIndex } = this.state
    const { text, options } = currentSection
    const currentText = text[textIndex]
    const hasMore = textIndex < text.length - 1
    if (hasMore) {
      return (
        <div style={{ width: '100%' }}>
          <StoryText>{ currentText }</StoryText>
          <Continue onClick={() => this.setState({ textIndex: textIndex + 1})}>Continue...</Continue>
        </div>)
    } else {
      return (
        <div style={{ width: '100%' }}>
          <StoryText>{ currentText }</StoryText>
          <FlexRow>{ this.renderRewards() }</FlexRow>
          { this.renderOptions(options) }
        </div>)
    }
  }
  render() {
    const { game, currentSection, sectionMeta, player } = this.state
    if (!game) return <ErrorScreen />
    const { text, options } = currentSection
    const hasBattle = sectionMeta.hasChallenge && !sectionMeta.challengePassed
    const showItems = !!player.items.length
    return (
      <div>
      <Panel spaceBottom>
        { hasBattle ? this.renderBattle() : this.renderChoice()}
      </Panel>
      { player.health && <Player player={player} gameState={this.props.session.gameState} /> }
      { showItems ? <PlayerItems player={player} gameState={this.props.session.gameState} /> : <noscript /> }
      </div>
    );
  }
}
export default App;
