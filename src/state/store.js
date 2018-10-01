import { applyMiddleware, createStore } from "redux"
import { loadState } from "./localStorage"

import { createLogger } from "redux-logger"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"

import reducer from "../reducers/index"
const persistedState = loadState()

const middleware = applyMiddleware(promise(), thunk, createLogger())

export default createStore(reducer, persistedState, middleware)
