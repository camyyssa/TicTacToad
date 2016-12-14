import React, { Component } from 'react';
import logo from './logo.svg';
import Board from './Board.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Tic Tac Toad</h2>
        <div className="App-description">
          Who will achieve pond domination?
        </div>
        </div>
        <Board />
        <p className="App-intro">
          Scoreboard comes here
        </p>
      </div>
    );
  }
}

export default App;
