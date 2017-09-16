import { deepCopy } from '../utilities'

class GameState {
  constructor(story, session){
    this.id = `${story.author}/${story.title}`
    if (story.player) {
      this.player = deepCopy(story.player)
      this.player.currentHealth = story.player.health
      this.player.currentWeapon = 0
    } else {
      this.player = {}
    }
    this.player.items = []
    this.player.hiddenItems = []
    this.sectionMeta = {}
    this.currentSection = 0
    this.session = session
  }
  hydrate(meta){
    this.player = meta.player
    this.sectionMeta = meta.sectionMeta
  }
  updateSection(id){
    this.currentSection = id
  }
  takeItem(key){
    const section = this.sectionMeta[this.currentSection]
    const reward = section.rewards[key]
    reward.obtained = true
    if(reward.type === 'weapon'){
      this.player.weapons.push(reward)
    } else if(reward.type === 'armor'){
      this.player.defense = reward.defense
      this.player.armor = reward.name
    } else if(reward.type === 'key'){
      this.player.items.push(reward)
    }
    this.session.update()
  }
  takeHiddenItem(key){
    const section = this.sectionMeta[this.currentSection]
    const reward = section.rewards[key]
    this.player.hiddenItems.push(reward)
  }
  recoverHealth(){
    this.player.currentHealth = this.player.health
    this.session.update()
  }
  playerHasItem(name){
    const matches = this.player.items.filter(item => item.name === name)
    return !!matches.length
  }
  playerHasHiddenItem(name){
    const matches = this.player.hiddenItems.filter(item => item.name === name)
    return !!matches.length
  }
  usePlayerItem(name){
    const { items } = this.player
    let found = false
    let newList = []
    for(let i = 0; i < items.length; i++){
      if(items[i].name === name && !found){
        found = true
      } else {
        newList.push(items[i])
      }
    }
    this.player.items = newList
  }
  equip(idx){
    this.player.currentWeapon = idx
    this.session.update()
  }
  getMetaForSection(section){
    if(this.sectionMeta[section.id]){
      return this.sectionMeta[section.id]
    } else {
      let meta = {
        hasChallenge: !!section.challenge,
        challengePassed: false,
        rewards: {},
        options: {},
        hasHealthRecovery: section.recoverHealth,
      }
      section.rewards.forEach(reward => {
        meta.rewards[reward.name] = Object.assign({ obtained: false }, reward)
      })
      if(Array.isArray(section.options)){
        section.options.forEach(option => {
          meta.options[option.target] = {
            isLocked: !!option.lock
          }
        })
      }
      this.sectionMeta[section.id] = meta
      return meta
    }
  }
  toJSON(){
    return {
      player: this.player,
      sectionMeta: this.sectionMeta,
    }
  }
}

export default GameState
