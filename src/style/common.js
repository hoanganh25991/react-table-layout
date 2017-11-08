export const combineStyle = (...styles) => {
  return styles.reduce((carry, style) => {
    return { ...carry, ...style }
  }, {})
}

export const header = {
  padding: 0,
  margin: 0,
  fontSize: 18
}
