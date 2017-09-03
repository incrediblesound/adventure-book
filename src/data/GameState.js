import { deepCopy } from '../utilities'

class GameState {
  constructor(story, session){
    this.id = `${story.author}/${story.title}`
    this.player = deepCopy(story.player)
    this.player.currentHealth = story.player.health
    this.player.currentWeapon = 0
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
  takeReward(key){
    const section = this.sectionMeta[this.currentSection]
    const reward = section.rewards[key]
    reward.obtained = true
    if(reward.type === 'weapon'){
      this.player.weapons.push(section.rewards[key])
    } else if(reward.type === 'armor'){
      this.player.defense = reward.defense
      this.player.armor = reward.name
    }
    this.session.update()
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
        rewards: {}
      }
      section.rewards.forEach(reward => {
        meta.rewards[reward.name] = Object.assign({ obtained: false }, reward)
      })
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