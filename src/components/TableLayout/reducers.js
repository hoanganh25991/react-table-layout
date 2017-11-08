import { reducers as tableCateReducers } from "../TableCate/reducers"
import { combineReducers } from "redux"

export const reducers = combineReducers({
  tableCate: tableCateReducers
})

export const getTableCateState = state => state && state.tableCate

export default reducers
