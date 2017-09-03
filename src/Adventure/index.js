import React, {Component} from 'react';
import parser from 'story-parser'
import styled from 'styled-components'
import BattleScreen from '../BattleScreen/index.js'
import { Weapon, Armor } from './items.jsx'
import { Panel, Button } from '../components/index.jsx'
import Player from './Player.jsx'

const StoryText = styled.p`
  font-size: 20px;
  font-weight: 300;
`;


class App extends Component {
  constructor({ content, session }){
    super()
    const [ game ] = parser(content)
    const section = game.pages.filter(section => section.id === 0)[0]
    session.startStory(game)

    this.state = {
      game,
      currentSectionId: 0,
      currentSection: section,
      selectedOption: null,
      player: session.gameState.player,
      sectionMeta: session.gameState.getMetaForSection(section),
    }
  }
  selectOption(target){
    this.setState({
      selectedOption: target
    })
  }
  handleGo = () => {
    const { session } = this.props
    const { selectedOption, game } = this.state
    const section = game.pages.filter(section => section.id === selectedOption)[0]
    session.gameState.updateSection(selectedOption)
    this.setState({
      currentSection: section,
      sectionMeta: session.gameState.getMetaForSection(section),
      currentSectionId: selectedOption,
      selectedOption: null
    })
  }
  restart = () => {
    const { session } = this.props
    session.startStory(this.state.game)

    this.setState({
      selectedOption: 0,
      player: session.gameState.player
    }, this.handleGo)

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
        default:
          return <noscript />
      }
    })
  }
  renderOptions(options) {
    if(options === 'END'){
      return (
        <button onClick={() => this.restart()}>Start Over</button>
      )
    }
    return options.map(option => {
      const isChecked = this.state.selectedOption === option.target
      return (
        <div>
          <label>
            <input
              type="radio"
              onChange={() => this.selectOption(option.target)}
              checked={isChecked}
            />
            {` - ${option.text}`}
          </label>
        </div>
      )
    })
  }
  renderChoice(){
    const { player, currentSection, challenge } = this.state
    const { text, options } = currentSection
    return (
      <div>
        <StoryText>{ text }</StoryText>
        <p style={{ textAlign: 'center' }}>~</p>
        { this.renderOptions(options) }
        { options !== 'END' && <div><Button space color="gray" size="large" onClick={() => this.handleGo()}>GO</Button></div> }
        { this.renderRewards() }
      </div>
    )
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
      <Player player={player} gameState={this.props.session.gameState}/>
      </div>
    );
  }
}
export default App;
