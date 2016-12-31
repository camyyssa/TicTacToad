import React, { Component } from 'react';
import Board from './Components/Board';
import Players from './Components/Players';
import Scoreboard from './Components/Scoreboard';
import WinnerScreen from './Components/WinnerScreen';
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
      <Scoreboard />
      <WinnerScreen />
    </div>
    );
  }
}

export default App;
