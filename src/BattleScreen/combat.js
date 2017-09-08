import { rndUp, rndDown } from '../utilities.js'

const calculateDamage = (attack) => {
  const first = rndUp(attack)
  const second = rndUp(attack)
  return Math.max(first, second)
}

const didHit = (defense) => {
  const first = rndDown(20)
  const second = rndDown(20)
  return first > defense || second > defense
}

export const playerStrike = (player, challenge) => {
  const weapon = player.weapons[player.currentWeapon]
  if(didHit(challenge.defense)){
    const damage = calculateDamage(weapon.attack)
    challenge.currentHealth -= damage
    return true
  }
  return false
}

export const challengeStrike = (player, challenge) => {
  if(didHit(player.defense)){
    const damage = calculateDamage(challenge.attack)
    player.currentHealth -= damage
  }
}
