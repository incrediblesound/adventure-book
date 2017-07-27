import textExample from './example2.js'

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
