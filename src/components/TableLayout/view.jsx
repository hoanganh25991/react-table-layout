import React from "react"
import s from "./style"


import TableCate from "../TableCate/view"
import TableMap from "../TableMap/view"
import {getTableCateState, getTableMapState} from "./reducers"

class TableLayout extends React.PureComponent {



  render(){
    const {model, dispatch} = this.props
    const tableCateModel = getTableCateState(model)
    const tableMapModel = getTableCateState(model)

    return (
      <div style={s.rootDiv}>
        <div style={s.header}>TableLayout</div>
        <div style={s.layoutDiv}>
          <TableCate model={tableCateModel} dispatch={dispatch}/>
          <TableMap model={tableMapModel} dispatch={dispatch}/>
        </div>
      </div>
    )
  }
}

export default TableLayout