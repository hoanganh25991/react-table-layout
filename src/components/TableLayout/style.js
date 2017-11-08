import { header, dev } from "../../style/common"

const style = {
  rootDiv: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    ...dev
  },
  header: {
    ...header,
    color: "red"
  },
  layoutDiv: {
    flex: 1,
    display: "flex",
    flexDirection: "row"
  }
}

export default style
