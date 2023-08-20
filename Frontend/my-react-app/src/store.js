// import {applyMiddleware , compose, createStore} from 'redux'
// import {configureStore} from '@reduxjs/toolkit'
// import thunkMiddleware from 'redux-thunk'
// import rootReducer from './reducers';
// import {composeWithDevTools} from 'redux-devtools-extension'

// const initialState ={}
// const middleware = [thunkMiddleware]

// export default function configureStore(initialState){
//     const middlewareEnhancer = applyMiddleware(...middleware)
//     const enhancers = [middlewareEnhancer]
//     const composeEnhancer = composeWithDevTools(...enhancers)
//     const store = createStore(rootReducer, initialState, composeEnhancer)
//     return store
// }

import { configureStore } from '@reduxjs/toolkit'

import rootReducer from './reducers'
const initialState = {}

// Automatically adds the thunk middleware and the Redux DevTools extension
const store = configureStore({
  // Automatically calls `combineReducers`
  reducer : rootReducer,
  preloadedState : initialState
})

export default store;