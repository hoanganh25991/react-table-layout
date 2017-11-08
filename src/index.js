import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import { Provider, connect } from "react-redux"
import registerServiceWorker from "./registerServiceWorker"
import { createStore, applyMiddleware } from "redux"
import reducers from "./reducers"
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly"
import thunkMiddleware from "redux-thunk"
import { getState } from "./reducers"

const CApp = connect(getState, null)(App)
const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware)))

ReactDOM.render(
  <Provider store={store}>
    <CApp />
  </Provider>,
  document.getElementById("root")
)
registerServiceWorker()
