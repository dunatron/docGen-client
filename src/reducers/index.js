import { combineReducers } from "redux"

import token from "./tokenReducer"
import docGen from "./docGenReducer"
import dataPiper from "./dataPiperReducer"

export default combineReducers({
  token,
  dataPiper,
  docGen,
})
