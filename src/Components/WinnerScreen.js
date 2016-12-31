import React from 'react';
import { connect } from 'react-redux';
import { winnerCodes } from '../Common';
import './WinnerScreen.css';

const mapStateToProps = (state) => {
  return { 
    winnerIndex: state.announceWinner,
    players: state.players
  };
};

let WinnerScreen = ({ winnerIndex, players }) => {
  if (winnerIndex === winnerCodes.noWinner) {
    return (<div style={{display: 'none'}}></div>);
  }

  let text = '';
  if (winnerIndex === winnerCodes.x || winnerIndex === winnerCodes.zero) {
    text += `Yay! ${players[winnerIndex]} won!`;
  } else if (winnerIndex === winnerCodes.draw) {
    text += 'A draw! Shall we match again?';
  } else {
    text += 'Hmmmm.... something weird just happened';
  }
  return (
    <div className='WinnerScreen'>
      <div className='WinnerScreen-notification'>
        {text}
      </div>       
    </div>
  );
};

WinnerScreen = connect(mapStateToProps)(WinnerScreen);

export default WinnerScreen;
