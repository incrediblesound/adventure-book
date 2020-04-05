export const player = () => `
PLAYER "hero"
HEALTH 20 ATTACK 3 DEFENSE 4
ITEM "weapon" NAME "sword" DAMAGE 3 SPEED 4
ITEM "armor" NAME "leather" DEFENSE 1
MONEY "gold" 20
`

export const goals = () => `
GOAL 1 "Find room 2" PAGE 2
GOAL 2 "Find the sword" ITEM "sword"
GOAL 3 "Defeat the skeleton" DEFEAT "skeleton"
`

export const page = (n) => `
PAGE ${n}
"this place has two exits."
OPTION ${n+1} "This option goes to page ${n+1}"
OPTION ${n+2} "This option goes to page ${n+2}"
`

export const item = (n) => `
PAGE ${n}
"this place has a key."
ITEM "key" NAME "silver key"
OPTION ${n+1} "This option goes to page ${n+1}" LOCK "silver key"
`

export const challenge = (n) => `
PAGE ${n}
"There is an enemy in this room"

CHALLENGE "enemy"
HEALTH 5 SPEED 3 ATTACK 3 DEFENSE 4
WEAPON "dagger" DAMAGE 2

ITEM "weapon" NAME "magic sword" DAMAGE 4 SPEED 6

OPTION ${n+1} "Go to ${n+1}"
`

export const itemSale = (n) => `
PAGE ${n}
"this place has items for sale."

ITEM "armor" NAME "chainmail" DEFENSE 3
COST "gold" 10
ITEM "weapon" NAME "magic sword" DAMAGE 4 SPEED 6
COST "gold" 10

OPTION ${n+1} "This option goes to page ${n+1}"
`

export const templates = [
  player,
  goals,
  page,
  item,
  challenge,
  itemSale,
]

export const prompts = [
  'Put player stats at the beginning of your story',
  'Add goals to help your player track progress',
  'Pages are numbered, they have a description and options that point to other pages',
  'Key type items are used to gate entry to certain pages',
  'Add an enemy to your page and rewards for when the player defeats them',
  'Make a store by adding a cost to the items'
]