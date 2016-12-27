import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { reducers } from './Reducers/Main';
import { createStore } from 'redux';

it('renders without crashing', () => {
  let store = createStore(reducers);

  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}><App /></Provider>, div);
});
