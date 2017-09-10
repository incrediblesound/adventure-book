export const player = () => `
PLAYER "hero"
HEALTH 10 SPEED 3 ATTACK 3 DEFENSE 4
WEAPON "armor" ARMOR "leather"
----------------------------
`

export const page = (n) => `
PAGE ${n}
"this place has two exits."
OPTION ${n+1} "This option goes to page ${n+1}"
OPTION ${n+2} "This option goes to page ${n+2}"
--------------------------------------
`

export const item = (n) => `
PAGE ${n}
"this place has a key."
REWARD TYPE "item" NAME "key"
OPTION ${n+1} "This option goes to page ${n+1}"
OPTION ${n+2} "This option goes to page ${n+2}"
--------------------------------------
`

export const challenge = (n) => `
PAGE ${n}
"There is an enemy in this room!"

CHALLENGE "enemy"
HEALTH 5 SPEED 3 ATTACK 1 DEFENSE 4
WEAPON "dagger"

OPTION ${n+1}
"Go to ${n+1}"
--------------------------------------
`

export const rewards = (n) => `
PAGE ${n}
"There is an enemy in this room!"

CHALLENGE "enemy"
HEALTH 5 SPEED 3 ATTACK 1 DEFENSE 4
WEAPON "dagger"

REWARD TYPE "weapon" NAME "magic sword"
ATTACK 4 SPEED 6

REWARD TYPE "armor" NAME "plate mail"
DEFENSE 8

OPTION ${n+1}
"Go to ${n+1}"
--------------------------------------
`
