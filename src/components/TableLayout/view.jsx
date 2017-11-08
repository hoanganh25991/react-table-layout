import React from "react"
import s from "./style"


import TableCate from "../TableCate/view"
import TableMap from "../TableMap/view"

class TableLayout extends React.PureComponent {



  render(){

    return (
      <div style={s.rootDiv}>
        <div style={s.header}>TableLayout</div>
        <div style={s.layoutDiv}>
          <TableCate/>
          <TableMap/>
        </div>

      </div>
    )
  }
}

export default TableLayout