import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { reducer } from './reducers';
import { createStore } from 'redux';
import './index.css';

let store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
