export const a =
`
PAGE 0
"You are in a room with a door"
OPTION 1 "Go out the door"

PAGE 1
"Nothing much here"
OPTION 0 "Go back"
`
export const b =
`
PAGE 0
"You are in a room with a door"
OPTION 1 "Go out the door"

PAGE 1
"You win!"
(end)
`

export const c =
`
PAGE 0
"You are in a room, there is a door to the left and a door to the right."
"Which door do you take?"

OPTION 1 "Take the left door."
OPTION 2 "Take the right door." LOCK "silver key"
--------------------------------------
PAGE 1
"There is a silver key in this room."

ITEM TYPE "key" NAME "silver key"
OPTION 0 "Go back"
--------------------------------------
PAGE 2
"You made it!"
(end)
`

export const d =
`
PLAYER "hero"
HEALTH 10 SPEED 3 ATTACK 3 DEFENSE 4
WEAPON "sword"
ARMOR "leather"
--------------------------------------
PAGE 0
"There is a skeleton in this room!"

CHALLENGE "skeleton"
HEALTH 5 SPEED 3 ATTACK 1 DEFENSE 4
WEAPON "dagger"

OPTION 1 "Leave this cursed place"
--------------------------------------
PAGE 1
"You are in a bright green field, you made it!"
(end)`

export const e =
`
PLAYER "hero"
HEALTH 10 SPEED 3 ATTACK 3 DEFENSE 4
WEAPON "sword"
ARMOR "leather"
--------------------------------------
PAGE 0
"Take the gold to buy the armor"

ITEM TYPE "key" NAME "10 gold"

OPTION 1 "buy armor" LOCK "10 gold"
OPTION 2 "fight dragon"
----------------------------------
PAGE 1
"Here it is! A suit of excellent armor."

ITEM TYPE "armor" NAME "plate mail" DEFENSE 8

OPTION 0 "go back"
-------------------------------
PAGE 2
"You have defeated the dragon!"

CHALLENGE "dragon"
HEALTH 5 SPEED 1 ATTACK 5 DEFENSE 4
WEAPON "fire"

ITEM TYPE "weapon" NAME "magic sword"
ATTACK 5 SPEED 5

(end)
`
