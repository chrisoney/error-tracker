import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose
} from 'react-redux';
import { thunk } from 'redux-thunk';

import sessionReducer from './session';
import modalReducer from './modal';

const rootReducer = combineReducers({
  session: sessionReducer,
  modal: modalReducer,
})

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk)
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger))
}

export default function configureStore(preloadedState) {
  return createStore(rootReducer, preloadedState, enhancer);
}
