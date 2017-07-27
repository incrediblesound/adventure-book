import { trim } from '../utils'

const word = (wordText) => text => {
  text = trim(text)
  for(let i = 0; i < wordText.length; i++){
    if(wordText[i] !== text[i]) return [false, `Expected the word "${wordText}"`]
  }
  text = text.substring(wordText.length)
  return [true, text]
}

export default word
