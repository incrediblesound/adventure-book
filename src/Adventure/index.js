import React, {Component} from 'react';

class App extends Component {
  constructor({ story }){
    super()
    this.state = {
      story,
      currentSection: 0,
      selectedOption: null
    }
  }
  selectOption(target){
    this.setState({
      selectedOption: target
    })
  }
  handleGo(){
    this.setState({
      currentSection: this.state.selectedOption,
      selectedOption: null
    })
  }
  restart(){
    this.setState({
      currentSection: 0,
      selectedOption: null
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
  render() {
    const { story, currentSection } = this.state
    const section = story.filter(section => section.id === currentSection)[0]
    const { text, options } = section
    return (
      <div className='adventure'>
        <p>{ text }</p>
        <hr />
        { this.renderOptions(options) }
        { options !== 'END' && <div><button onClick={() => this.handleGo()}>GO</button></div> }
      </div>
    );
  }
}
export default App;
