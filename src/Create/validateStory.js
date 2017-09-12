export const getLastPage = (story) => {
  let max = 0
  story.pages.forEach(page => {
    if(page.id > max){
      max = page.id
    }
  })
  return max
}

const validate = (story) => {
  const targets = []
  const data = story.pages.reduce((result, page) => {
    result[page.id] = []
    if(page.options !== 'END'){
      page.options.forEach(option => {
        targets.push(option.target)
        result[page.id].push(option.target)
      })
    }
    return result
  }, {})
  if(!data[0]){
    return 'Your story must have a page 0 to start'
  }
  for(let i = 0; i < targets.length; i++){
    if(!data[targets[i]]){
      return `Page ${targets[i]} doesn't exist but an option points to it.`
    } else if(data[targets[i]].indexOf && data[targets[i]].indexOf(targets[i]) !== -1){
      return `Page ${targets[i]} has an option that points to itself.`
    }
  }
}

export default validate
