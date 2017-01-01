import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
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
  let content = '';
  if (winnerIndex !== winnerCodes.noWinner) {
    let text = '';
    if (winnerIndex === winnerCodes.x || winnerIndex === winnerCodes.zero) {
      text += `Yay! ${players[winnerIndex]} won!`;
    } else if (winnerIndex === winnerCodes.draw) {
      text += 'A draw! Shall we match again?';
    } else {
      text += 'Hmmmm.... something weird just happened';
    }
    content = (
      <div className='WinnerScreen-notification'>
        {text}
      </div>);
  }
  return (
    <div className='WinnerScreen'>
      <ReactCSSTransitionGroup 
        transitionName='WinnerScreen-show'
        transitionEnterTimeout={700}
        transitionLeaveTimeout={700}>
        {content}
      </ReactCSSTransitionGroup>       
    </div>
  );
};

WinnerScreen = connect(mapStateToProps)(WinnerScreen);

export default WinnerScreen;
