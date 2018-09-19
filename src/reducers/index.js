import { combineReducers } from "redux"

import token from "./tokenReducer"
import dataConnector from "./dataConnector"
import docGen from "./docGenReducer"
import docY from "./docYReducer"

export default combineReducers({
  token,
  dataConnector,
  docY,
  docGen,
})
