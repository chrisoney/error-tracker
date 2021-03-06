import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose
} from 'redux';
import thunk from 'redux-thunk';

import sessionReducer from './session';
import modalReducer from './modal';
import moduleReducer from './module';
import errorReducer from './error';
import answerReducer from './answer';
import messageReducer from './message';
import uiReducer from './ui';

const rootReducer = combineReducers({
  session: sessionReducer,
  modal: modalReducer,
  modules: moduleReducer,
  errors: errorReducer,
  answers: answerReducer,
  messages: messageReducer,
  ui: uiReducer,
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
