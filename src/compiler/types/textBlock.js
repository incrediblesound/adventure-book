import { trim } from '../utils'

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

export default textBlock
