import React from 'react'
import { Example } from './index.jsx'

export const story = () => <Example><pre>{`
  {{ any number of Item Drops }}
  {{ optional Player }}
  {{ at least one Page }}
  `}</pre><p>{`
Example:
`}</p><pre>{`
ITEM_DROP "weapons"
ITEM TYPE "weapon" NAME "ice sword"
DAMAGE 3 SPEED 6
ITEM TYPE "weapon" NAME "fire sword"
DAMAGE 5 SPEED 3

PLAYER "hero"
HEALTH 20 ATTACK 3 DEFENSE 4
ITEM TYPE "weapon" NAME "sword" DAMAGE 3 SPEED 4
ITEM TYPE "armor" NAME "leather" DEFENSE 1

PAGE 0
"The enemy dropped a weapon."

CHALLENGE "enemy"
TEXT "An enemy attacks!"
HEALTH 5 SPEED 3 ATTACK 3 DEFENSE 4
WEAPON "dagger" DAMAGE 2

ITEM TYPE "drop" NAME "weapons"

(end)
    `}</pre></Example>

export const drop = () => <Example><pre>{`
ITEM_DROP "name of item drop"
{{ at least two items }}
`}</pre><p>{`
Item drop is a collection of items that can be used to give a random item to the player.
`}</p></Example>

export const player = () => <Example><pre>{`
PLAYER "players name"
HEALTH (number)
ATTACK (number)
DEFENSE (number)
{{ any number of Items }}
`}</pre></Example>

export const page = () => <Example><pre>{`
PAGE (number)
{{ any number of "quoted text blocks" }}
{{ optional RECOVER_HEALTH }}
{{ optional Challenger }}
{{ any number of Items }}
{{ either (end) or any number of Options }}
`}</pre><p>{`
Explanation:
The quoted text blocks are the text content of the page.
The keyword recover health will add a one time use "recover health" button to the page
that will restore the players health.
There is an optional challenger for stories with combat.
There may be any number of items that the player can pick up.
Finally, there is either the keyword (end) or a list of options that point to other pages.
`}</p></Example>

export const option = () => <Example><pre>{`
OPTION (number) "option description" {{ optional LOCK "key name" }} {{ optional IF "item name" }}`}</pre>
<p>{`Options have a description and will navigate the user to the page indicated by the option number. Options can be locked with LOCK, which is visible to the user, or can be hidden with IF, which means they are visible only if the user has a specific item.
`}</p></Example>

export const challenge = () => <Example><pre>{`
CHALLENGE "enemy name"
TEXT "Some text to introduce the encounter"
HEALTH (number)
SPEED (number)
ATTACK (number)
DEFENSE (number)
WEAPON "name of weapon"
DAMAGE (number)
`}</pre><p>{`
Most of this is self-explanatory but it's helpful to know how combat works in order to chose a good number for attack and defense. The defenders defense is subtracted from the attackers attack number, which is then subtracted from a baseline of ten to get the hit number. Two random numbers from zero to twenty are created and if one of them is greater than the hit number then the attacker hits. So if the attacker has attack of five and the defense has a defense of six the calculation looks like this:
5 - 6 = -1
10 - (-1) = 11
This attacker must get a random number over eleven in order to hit.
`}</p></Example>

export const items = () => <Example><pre>{`
{{ any number of Weapons or Armor or other Items }}
`}</pre><p>{'Items with type "weapon" have name, damage and speed:'}</p>
<pre>{`
ITEM TYPE "weapon"
NAME "name of weapon"
DAMAGE (number)
SPEED (number)
`}</pre><p>{`
Items with type "armor" have name and defense:
`}</p><pre>{`
ITEM TYPE "armor"
NAME "name of armor"
DEFENSE (number)
`}</pre><p>{`
Items with type "key" or "hidden" only have a name:
`}</p><pre>
{`
ITEM TYPE "{{ key or hidden }}"
NAME "name of item"
`}</pre><p>{`
Items with type "key" appear on the page and must be collected by the user. If an option is locked with the keywork LOCK then the option and the key required to open it will be visible to the user. Items with type "hidden" are collected by the player without their knowledge. Options locked with the keyword IF will be hidden from the user until the have the hidden object named in the IF clause.
`}</p><pre>
{`
ITEM TYPE "drop"
NAME "name of drop"
`}</pre><p>{`
An item of type "drop" must have a name that matches an Item Drop. Storybook will randomly select an item from the Item Drop.
`}</p></Example>
