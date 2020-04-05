import { deepCopy } from '../utilities'

interface Currency {
  name: string;
  amount: number;
}

interface Goal {
  name: string;
  index: number;
  method: string;
  condition: string;
}

class GameState {
  id: string;
  player: any;
  sectionMeta: any;
  currentSection: any;
  session: any;
  game: any;
  constructor(gameData: any, game: any, session: any){
    this.id = `${gameData.author}/${gameData.title}`

    if (game.player) {
      this.player = deepCopy(game.player)
      this.player.items = []
      this.player.hiddenItems = []
      this.player.currentHealth = game.player.health
      this.player.currentWeapon = 0
      this.player.currency = this.player.currency || []
      this.player.completedGoals = {}

    } else {
      this.player = {
        items: [],
        hiddenItems: [],
        currency: []
      }
    }
    this.game = game
    this.sectionMeta = {}
    this.currentSection = 0
    this.session = session
  }
  hydrate(meta: any){
    this.player = meta.player
    this.sectionMeta = meta.sectionMeta
  }
  updateSection(id: number){
    this.currentSection = id
  }
  takeItem(key: string){
    const section = this.sectionMeta[this.currentSection]
    const reward = section.rewards[key]
    if (reward.cost) {
      const playerMoney = this.player.currency.filter((currency: Currency) => currency.name === reward.cost.name)[0]
      playerMoney.amount -= reward.cost.amount
    }
    reward.obtained = true
    const rewardGoal = this.game.goals
      .filter((goal: Goal) => goal.method === 'ITEM')
      .filter((goal: Goal) => goal.condition === reward.name)[0]
    if (rewardGoal) {
      this.player.completedGoals[rewardGoal.index] = true
    }
    switch(reward.type) {
      case 'weapon':
        this.player.weapons.push(reward)
        break
      case 'armor':
        this.player.armor.push(reward)
        break
      case 'key':
      case 'health':
        this.player.items.push(reward)
        break
      case 'currency':
        this.player.currency.forEach((currency: any) => {
          if (currency.name === reward.name) {
            currency.amount += reward.amount
          }
        })
    }

    this.session.update()
  }
  takeHiddenItem(key: string){
    const section = this.sectionMeta[this.currentSection]
    const reward = section.rewards[key]
    reward.obtained = true
    this.player.hiddenItems.push(reward)
  }
  recoverHealth(){
    this.player.currentHealth = this.player.health
    this.session.update()
  }
  consumeHealthItem(item: any){
    const { player } = this;
    player.currentHealth = Math.min(player.health, player.currentHealth + item.recovery);
    this.usePlayerItem(item.name)
    this.session.update();
  }
  playerHasItem(name: any){
    const matches = this.player.items.filter((item: any) => item.name === name)
    return !!matches.length
  }
  playerHasHiddenItem(item: any){
    const matches = this.player.hiddenItems.filter((hidden: any) => hidden.name === item.name)
    return !!matches.length
  }
  usePlayerItem(name: string){
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
  equip(idx: number){
    this.player.currentWeapon = idx
    this.session.update()
  }
  getMetaForSection(section: any){
    if(this.sectionMeta[section.id]){
      return this.sectionMeta[section.id]
    } else {
      let meta = {
        hasChallenge: !!section.challenges.length,
        challengePassed: false,
        rewards: {},
        options: {},
        hasHealthRecovery: section.recoverHealth,
      }
      section.rewards.forEach((reward: any) => {
        (meta.rewards as any)[reward.name] = (Object as any).assign({ obtained: false }, reward)
      })
      section.currency.forEach((currency: any) => {
        (meta.rewards as any)[currency.name] = (Object as any).assign({ obtained: false, type: 'currency' }, currency)
      })
      if(Array.isArray(section.options)){
        section.options.forEach((option: any) => {
          (meta.options as any)[option.target] = {
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
