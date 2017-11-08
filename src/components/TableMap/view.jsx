import React from "react"
import s from "./style"
import {header, combineStyle as c} from "../../style/common";

class TableMap extends React.PureComponent {
  render(){
    return (
      <div style={s.rootDiv}>
        <div style={c(header)}>TableMap</div>
      </div>
    )
  }
}

export default TableMap