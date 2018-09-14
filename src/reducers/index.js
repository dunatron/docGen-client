import { combineReducers } from "redux"

import token from "./tokenReducer"
import docGen from "./docGenReducer"

export default combineReducers({
  token,
  docGen,
})
