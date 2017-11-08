const dev = {
  border: "1px solid black",
  boxSizing: "border-box"
}

const style = {
  rootDiv: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    ...dev
  },
  layoutDiv: {
    flex: 1,
    display: "flex",
    flexDirection: "row"
  }
}

export default style
