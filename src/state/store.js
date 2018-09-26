// import {applyMiddleware, createStore} from 'redux';

// import {createLogger} from 'redux-logger';
// import thunk from 'redux-thunk';
// import promise from 'redux-promise-middleware';

// import reducer from '../reducers/index';

// const middleware = applyMiddleware(promise(), thunk, createLogger());

// export default createStore(reducer, middleware);

import { applyMiddleware, createStore } from "redux"
import { loadState } from "./localStorage"

import { createLogger } from "redux-logger"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"

import reducer from "../reducers/index"
const persistedState = loadState()

console.log("TRONS PERSISTED STATE =) ", persistedState)
const middleware = applyMiddleware(promise(), thunk, createLogger())

export default createStore(reducer, persistedState, middleware)
// export default createStore(reducer, middleware)
