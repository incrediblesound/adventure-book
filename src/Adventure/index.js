import React, {Component} from 'react';
import parser from 'story-parser'
import styled from 'styled-components'
import BattleScreen from '../BattleScreen/index.js'

const StoryText = styled.p`
  font-size: 18px;
  font-weight: 300;
`

const Adventure = styled.div`
  position: relative;
  width: 640px;
  height: 480px;
  box-shadow: 0px 1px 4px 1px #ddd;
  overflow-x: scroll;
  border: 1px solid #ddd;
  border-radius: 3px;
  padding: 10px;
`


class App extends Component {
  constructor({ content, session }){
    super()
    const [ game ] = parser(content)
    const section = game.pages.filter(section => section.id === 0)[0]
    const player = game.player
    player.currentHealth = player.health

    this.state = {
      game,
      player,
      currentSectionId: 0,
      currentSection: section,
      sectionMeta: session.getMetaForSection(section),
      selectedOption: null,
    }
  }
  selectOption(target){
    this.setState({
      selectedOption: target
    })
  }
  handleGo = () => {
    const { selectedOption, game } = this.state
    const section = game.pages.filter(section => section.id === selectedOption)[0]
    this.setState({
      currentSection: section,
      sectionMeta: this.props.session.getMetaForSection(section),
      currentSectionId: this.state.selectedOption,
      selectedOption: null
    })
  }
  restart = () => {
    this.setState({
      selectedOption: 0,
      player: this.state.game.player
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
      <div>
        <BattleScreen
          player={player}
          challenge={challenge}
          onWin={this.playerWin}
          onLose={this.restart}
        />
      </div>
    )
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
        { options !== 'END' && <div><button onClick={() => this.handleGo()}>GO</button></div> }
      </div>
    )
  }
  render() {
    const { game, currentSection, sectionMeta } = this.state
    const { text, options } = currentSection
    const hasBattle = sectionMeta.hasChallenge && !sectionMeta.challengePassed
    return (
      <Adventure>
        { hasBattle ? this.renderBattle() : this.renderChoice()}
      </Adventure>
    );
  }
}
export default App;
