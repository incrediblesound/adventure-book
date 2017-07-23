import textExample from './example2.js'

const arrayOf = (parser) => (text) => {
  let result = []
  let next
  do {
    let [nextResult, nextText] = parser(text)
    if(nextResult){
      result.push(nextResult)
    } else {
      break
    }
    text = nextText
    next = nextResult
  } while(next)
  return [result, text]
}

const or = (parserA, parserB) => text => {
  const resultA = parserA(text)
  if(resultA[0]) return resultA

  return parserB(text)
}

const sequence = (...parsers) => text => {
  let result = []
  for(let i = 0; i < parsers.length; i++){
    let [nextResult, nextText] = parsers[i](text)
    if(nextResult === false) return [nextResult, nextText]

    result.push(nextResult)
    text = nextText
  }
  return [result, text]
}

const textBlock = () => text => {
  text = trim(text)
  if(text[0] !== '"') return [ false, 'Expected quoted text block']
  text = text.substring(1)

  let result = ''
  while(text[0] !== '"'){
    result += text[0]
    text = text.substring(1)
    if(!text.length) return [ false, 'Quoted text block is missing an end quote']
  }
  text = text.substring(1) // remove final quote
  return [result, text]
}

const word = (wordText) => text => {
  text = trim(text)
  for(let i = 0; i < wordText.length; i++){
    if(wordText[i] !== text[i]) return [false, `Expected the word "${wordText}"`]
  }
  text = text.substring(wordText.length)
  return [true, text]
}

const integer = () => text => {
  text = trim(text)
  let x = 0
  while(/[0-9]/.test(text[x])){
    x++
  }
  if(!x) return [false, 'Expected a number']
  let num = text.substring(0, x)
  text = text.substring(x)
  return [num, text]
}

const end = () => text => {
  return word('(end)')(text)
}

const apply = (mapFunc, parser) => text => {
  const [result, nextText] = parser(text)
  if(!result) return [result, text]

  return [mapFunc(result), nextText]
}

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
  word('TARGET'),
  integer(),
  textBlock()
)

const section = () => sequence(
  word('SECTION'),
  integer(),
  textBlock(),
  or(
    end(), // arrayOf is always true, so check for end first, fix with atLeast(1, arrayOf(target()))
    apply(makeTargets, arrayOf(target()))
  )
)

const compiler = apply(makeSections, arrayOf(section()))

export default compiler

function trim(text){
  let x = 0
  while(
    text[x] === ' '
    || text[x] === '\n'
    || text[x] === '\r\n'
  ){
    x++
  }
  return text.substring(x)
}
