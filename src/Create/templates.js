export const player = `
PLAYER "hero"
HEALTH 10 SPEED 3 ATTACK 3 DEFENSE 4
WEAPON "armor" ARMOR "leather"
----------------------------
`

export const page = `
PAGE x
"this place has two exits."
OPTION y "This option goes to page y"
OPTION z "This option goes to page z"
--------------------------------------
`

export const item = `
PAGE x
"this place has a key."
REWARD TYPE "item" NAME "key"
OPTION y "This option goes to page y"
OPTION z "This option goes to page z"
--------------------------------------
`

export const challenge = `
PAGE x
"There is an enemy in this room!"

CHALLENGE "enemy"
HEALTH 5 SPEED 3 ATTACK 1 DEFENSE 4
WEAPON "dagger"

OPTION x
"Go to x"
--------------------------------------
`

export const rewards = `
PAGE x
"There is an enemy in this room!"

CHALLENGE "enemy"
HEALTH 5 SPEED 3 ATTACK 1 DEFENSE 4
WEAPON "dagger"

REWARD TYPE "weapon" NAME "magic sword"
ATTACK 4 SPEED 6

REWARD TYPE "armor" NAME "plate mail"
DEFENSE 8

OPTION x
"Go to x"
--------------------------------------
`
