import { reducers as tableCateReducers } from "../TableCate/reducers"
import { reducers as tableMapReducers } from "../TableMap/reducers"
import { combineReducers } from "redux"

export const reducers = combineReducers({
  tableCate: tableCateReducers,
  tableMap: tableMapReducers
})

export const getTableCateState = state => state
export const getTableMapState = state => state

export default reducers
