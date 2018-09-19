import { combineReducers } from "redux"

import token from "./tokenReducer"
import dataConnector from "./dataConnector"
import docGen from "./docGenReducer"
import dataPiper from "./dataPiperReducer"

export default combineReducers({
  token,
  dataConnector,
  dataPiper,
  docGen,
})
