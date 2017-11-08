import React from "react"
import s from "./style"
import {header, combineStyle as c} from "../../style/common";


import TableCate from "../TableCate/view"

class TableLayout extends React.PureComponent {
  render(){
    return (
      <div style={s.rootDiv}>
        <div style={c(header)}>TableLayout</div>
        <TableCate/>

      </div>
    )
  }
}

export default TableLayout