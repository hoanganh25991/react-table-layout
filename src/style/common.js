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

export const dev = {
  border: "1px solid black",
  boxSizing: "border-box"
}
