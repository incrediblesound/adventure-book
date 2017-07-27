const or = (parserA, parserB) => text => {
  const resultA = parserA(text)
  if(resultA[0]) return resultA

  return parserB(text)
}

export default or
