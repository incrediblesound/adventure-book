import { rndUp, rndDown } from '../utilities.js'

const calculateDamage = (attack) => {
  const first = rndUp(attack)
  const second = rndUp(attack)
  return Math.max(first, second)
}

const didHit = (attack, defense) => {
  const baseLine = 10
  const difference = attack - defense
  const strikeNumber = baseLine - difference
  const hitOne = rndDown(21)
  const hitTwo = rndDown(21)
  return hitOne > strikeNumber || hitTwo > strikeNumber
}

export const playerStrike = (player, challenge) => {
  const weapon = player.weapons[player.currentWeapon]
  if(didHit(player.attack, challenge.defense)){
    const damage = calculateDamage(weapon.damage)
    return { hit: true, damage }
  }
  return { hit: false }
}

export const challengeStrike = (player, challenge) => {
  const playerDefense = player.defense + (player.armor ? player.armor.defense : 0)
  if(didHit(challenge.attack, playerDefense)){
    const damage = calculateDamage(challenge.damage)
    return { hit: true, damage }
  } else {
    return { hit: false }
  }
}
