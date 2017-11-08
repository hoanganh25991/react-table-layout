import React, { Component } from "react"
import logo from "./logo.svg"
import "./App.css"
import TableLayout from "./components/TableLayout/view"

class App extends Component {
  render() {
    return (
      <div className="App" style={{ width: "100vw", height: "100vh" }}>
        <TableLayout />
      </div>
    )
  }
}

export default App
