import { combineReducers } from "redux"

import token from "./tokenReducer"
import user from "./userReducer"
import dataConnector from "./dataConnector"
import docGen from "./docGenReducer"
import docY from "./docYReducer"

export default combineReducers({
  token,
  user,
  dataConnector,
  docY,
  docGen,
})
