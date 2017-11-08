import { reducers as tableLayoutReducers } from "./components/TableLayout/reducers"
import { combineReducers } from "redux"

export const reducers = combineReducers({
  tableLayout: tableLayoutReducers
})

export const getState = state => ({ model: state })
export const getTableLayoutState = state => state && state.tableLayout

export default reducers
