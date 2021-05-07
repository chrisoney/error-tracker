import React, { useDispatch } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import configureStore from './store';

import './index.css';

const store = configureStore();

function Root() {
  const dispatch = useDispatch();
  return (
    <>
      <App />
      <div className='modal' />
    </>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
