export const deepCopy = (source) => {
  if(Array.isArray(source)){
    return source.map(item => {
      return deepCopy(item)
    })
  } else if (typeof source === 'object') {
    const result = {}
    const keys = Object.keys(source)
    keys.forEach(key => {
      result[key] = deepCopy(source[key])
    })
    return result
  } else {
    return source
  }
}

export const rndUp = (n) => Math.ceil(Math.random() * n)
export const rndDown = (n) => Math.floor(Math.random() * n)
