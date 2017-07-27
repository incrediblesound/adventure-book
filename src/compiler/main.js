import { apply, atLeast } from './utils'
import word from './types/word'
import integer from './types/integer'
import arrayOf from './types/arrayOf'
import textBlock from './types/textBlock'
import or from './types/or'
import sequence from './types/sequence'

const makeSections = (sections) => {
  return sections.map(section => ({
    id: parseInt(section[1]),
    text: section[2],
    options: Array.isArray(section[3]) ? section[3] : 'END'
  }))
}

const makeTargets = (parts) => {
  if(Array.isArray(parts) && parts.length){
    return parts.map(part => {
      return {
        target: parseInt(part[1]),
        text: part[2]
      }
    })
  }
}

const target = () => sequence(
  word('OPTION'),
  integer(),
  textBlock()
)

const section = () => sequence(
  word('PAGE'),
  integer(),
  textBlock(),
  or(
    word('(end)'),
    apply(makeTargets, atLeast(1, 'option', arrayOf(target())))
  )
)

const compiler = apply(makeSections, atLeast(1, 'page', arrayOf(section())))

export default compiler
