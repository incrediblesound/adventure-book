export const apply = (mapFunc, parser) => text => {
  const [result, nextText, nextError] = parser(text)
  if(!result) return [result, text, nextError]

  return [mapFunc(result), nextText]
}

export const atLeast = (num, type, parser) => text => {
  let [nextResult, nextText, nextError] = parser(text)
  if(nextResult.length < num){
    if(nextError){
      return [false, text, nextError]
    } else {
      return [false, text, `Expected at least ${num} ${type} but found ${nextResult.length}`]
    }
  } else {
    return [nextResult, nextText]
  }
}

export const trim = (text) => {
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
