import React, { Component } from "react"
import logo from "./logo.svg"
import "./App.css"
import TableLayout from "./components/TableLayout/view"

import { getTableLayoutState } from "./reducers"

class App extends Component {
  render() {
    const { model, dispatch } = this.props
    const tableLayoutModel = getTableLayoutState(model)
    return (
      <div className="App" style={{ width: "100vw", height: "100vh" }}>
        <TableLayout model={tableLayoutModel} dispatch={dispatch} />
      </div>
    )
  }
}

export default App
