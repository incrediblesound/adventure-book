class GameState {
  constructor(story){
    this.id = `${story.author}/${story.name}`
    this.player = story.player
    this.player.currentHealth = story.player.health
    this.sectionMeta = {}
  }
  hydrate(meta){
    this.player = meta.player
    this.sectionMeta = meta.sectionMeta
  }
  getMetaForSection(section){
    if(this.sectionMeta[section.id]){
      return this.sectionMeta[section.id]
    } else {
      let meta = {
        hasChallenge: !!section.challenge,
        challengePassed: false
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
