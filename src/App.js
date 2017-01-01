import React, { Component } from 'react';
import Board from './Components/Board';
import Players from './Components/Players';
import Scoreboard from './Components/Scoreboard';
import WinnerScreen from './Components/WinnerScreen';
import './App.css';

const pondBackground = require('../assets/pond.png');

class App extends Component {
  render() {
    const style = {
      backgroundImage: 'url(' + pondBackground + ')'
    };
    return (
      <div className='App'>
        <div className='App-background'></div>
        <div className='App-header'>
          <h1>Tic Tac Toad</h1>
          <div className='App-description'>
            Who will achieve pond domination?
          </div>
        </div>
        <div className='App-body' style={style}>
          <Board />
          <Players />
          <Scoreboard />
        </div>
        <WinnerScreen />
      </div>
    );
  }
}

export default App;
