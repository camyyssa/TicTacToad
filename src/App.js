import React, { Component } from 'react';
import Board from './Board';
import Players from './Players';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Tic Tac Toad</h2>
        <div className="App-description">
          Who will achieve pond domination?
        </div>
        </div>
        <Board />
        <Players />
        <p className="App-intro">
          Scoreboard comes here
        </p>
      </div>
    );
  }
}

export default App;
