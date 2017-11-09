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
    // display: "flex",
    // flexDirection: "row",
    // flexWrap: "wrap",
    // alignItems: "center",
    // justifyContent: "center"
  },
  canvas: {
    ...dev,
    borderColor: "red"
  },
  sampleCate: {
    height: 70,
    draggable: true,
    display: "block"
  }
}

export default style
