import React, {Component} from 'react';
import parser from 'story-parser'
import styled from 'styled-components'
import BattleScreen from '../BattleScreen/turnBattle.js'
import { Weapon, Armor, Item, Recovery } from './items.jsx'
import { Panel, Button, colors, FlexRow } from '../components/index.jsx'
import Player, { PlayerItems } from './Player.jsx'

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


class App extends Component {
  constructor({ content, session }){
    super()
    const game = parser(content).result
    const section = game.pages.filter(section => section.id === 0)[0]
    session.startStory(game)

    this.state = {
      game,
      textIndex: 0,
      currentSectionId: 0,
      currentSection: section,
      player: session.gameState.player,
      sectionMeta: session.gameState.getMetaForSection(section),
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
    const { text, challenge } = currentSection
    return (
      <BattleScreen
        player={player}
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
    const { sectionMeta } = this.state
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
    return recovery.concat(keys.map(key => {
      const reward = sectionMeta.rewards[key]
      if (reward.obtained) return <noscript />
      switch (reward.type) {
        case 'weapon':
          return <Weapon reward={reward} handleTake={() => gameState.takeItem(key)} />
        case 'armor':
          return <Armor reward={reward} handleTake={() => gameState.takeItem(key)} />
        case 'key':
          return <Item reward={reward} handleTake={() => gameState.takeItem(key)} />
        case 'hidden':
          gameState.takeHiddenItem(key)
          return <noscript />
        default:
          return <noscript />
      }
    }))
  }
  renderOptions(options) {
    const { gameState } = this.props.session
    const { sectionMeta } = this.state
    if(options === 'END'){
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
    const { text, options } = currentSection
    const hasBattle = sectionMeta.hasChallenge && !sectionMeta.challengePassed
    const showItems = !hasBattle && player.items.length
    return (
      <div>
      <Panel spaceBottom>
        { hasBattle ? this.renderBattle() : this.renderChoice()}
      </Panel>
      { player.health && <Player player={player} gameState={this.props.session.gameState}/> }
      { showItems ? <PlayerItems player={player} /> : <noscript /> }
      </div>
    );
  }
}
export default App;
