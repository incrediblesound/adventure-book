import React, {Component} from 'react';
import parser from 'story-parser'
import styled from 'styled-components'
import BattleScreen from '../BattleScreen/index.js'
import { Weapon, Armor, Item } from './items.jsx'
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
  padding: 5px;
  border-radius: 3px;
  cursor: pointer;
  user-select: none;
  color: ${ props => props.disabled ? '#666' : 'black'};
  margin: 10px;
  &:hover {
    background-color: ${ props => props.disabled ? 'white' : '#EEE'};
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
  takeReward = (idx) => {
    this.props.session.gameState.takeReward(idx)
    this.props.session.update()
  }
  renderRewards(){
    const { sectionMeta } = this.state
    const keys = Object.keys(sectionMeta.rewards)
    return keys.map(key => {
      const reward = sectionMeta.rewards[key]
      if (reward.obtained) return <noscript />
      switch (reward.type) {
        case 'weapon':
          return <Weapon reward={reward} handleTake={() => this.takeReward(key)} />
        case 'armor':
          return <Armor reward={reward} handleTake={() => this.takeReward(key)} />
        case 'item':
          return <Item reward={reward} handleTake={() => this.takeReward(key)} />
        default:
          return <noscript />
      }
    })
  }
  renderOptions(options) {
    const { gameState } = this.props.session
    if(options === 'END'){
      return (
        <Button color="green" size="large" onClick={() => this.restart()}>Start Over</Button>
      )
    }
    return options.map(option => {
      const isChecked = this.state.selectedOption === option.target
      const locked = option.lock && !gameState.playerHasItem(option.lock)
      if(locked){
        return (
          <div>
            <Choice disabled>
              {`${option.text} - (requires the ${option.lock} to open)`}
            </Choice>
          </div>
        )
      }
      return (
        <div>
          <Choice onClick={() => this.handleGo(option.target)}>
            {option.text}
          </Choice>
        </div>
      )
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
        <p style={{ textAlign: 'center' }}>~</p>
        <FlexRow>{ this.renderRewards() }</FlexRow>
        { this.renderOptions(options) }
        </div>)
    }
  }
  render() {
    const { game, currentSection, sectionMeta, player } = this.state
    const { text, options } = currentSection
    const hasBattle = sectionMeta.hasChallenge && !sectionMeta.challengePassed
    return (
      <div>
      <Panel>
        { hasBattle ? this.renderBattle() : this.renderChoice()}
      </Panel>
      { player.health && <Player player={player} gameState={this.props.session.gameState}/> }
      { player.items.length ? <PlayerItems player={player} /> : <noscript /> }
      </div>
    );
  }
}
export default App;
