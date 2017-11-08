import { header, dev } from "../../style/common"

const style = {
  rootDiv: {
    width: "25%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    ...dev
  },
  header,
  layoutDiv: {
    flex: 1,
    display: "block"
  },
  canvas: {
    ...dev,
    borderColor: "red"
  }
}

export default style
