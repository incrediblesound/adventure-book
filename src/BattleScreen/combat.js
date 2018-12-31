import { rndUp, rndDown } from '../utilities.js'

const calculateDamage = (maxDamage) => {
  return rndUp(maxDamage)
}

const didHit = (attack, defense) => {
  const baseLine = 10
  const difference = attack - defense
  const strikeThreshold = baseLine - difference
  const hitNumber = rndDown(21)
  return hitNumber > strikeThreshold
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
  const armor = player.armor || []
  const totalArmor = armor.reduce((acc, cur) => {
    return acc + cur.defense
  }, 0)
  const playerDefense = player.defense + totalArmor
  if(didHit(challenge.attack, playerDefense)){
    const damage = calculateDamage(challenge.weapon.damage)
    return { hit: true, damage }
  } else {
    return { hit: false }
  }
}
