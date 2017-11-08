import React, { Component } from "react"
import logo from "./logo.svg"
import "./App.css"
import { Layer, Stage } from "react-konva"
import MyRect from "./components/MyRect"
import MyImage from "./components/MyImage"
import ResizeImage from "./components/ResizeImage"

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <Stage width={700} height={700}>
          <Layer>
            <MyRect />
            <ResizeImage />
          </Layer>
        </Stage>
      </div>
    )
  }
}

export default App
