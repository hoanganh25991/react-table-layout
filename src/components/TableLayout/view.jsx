import React from "react"
import s from "./style"


import TableCate from "../TableCate/view"
import TableMap from "../TableMap/view"
import {getTableCateState} from "./reducers"

class TableLayout extends React.PureComponent {



  render(){
    const {model, dispatch} = this.props
    const tableCateModel = getTableCateState(model)

    return (
      <div style={s.rootDiv}>
        <div style={s.header}>TableLayout</div>
        <div style={s.layoutDiv}>
          <TableCate model={tableCateModel} dispatch={dispatch}/>
          <TableMap />
        </div>
      </div>
    )
  }
}

export default TableLayout