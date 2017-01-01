import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { winnerCodes } from '../Common';
import { exitWinnerState } from '../Actions';
import './WinnerScreen.css';

const tadaSound = require('../../assets/tada.mp3');
const drawSound = require('../../assets/draw.mp3');

const mapStateToProps = (state) => {
  return { 
    winnerIndex: state.announceWinner,
    players: state.players
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: () => {
      dispatch(exitWinnerState());
    }
  };
};

let WinnerScreen = ({ winnerIndex, players, onClick }) => {
  const classes = ['WinnerScreen'];
  if (winnerIndex > -1) {
    classes.push('WinnerScreen-active');

    let audio;
    if (winnerIndex < 2) {
      audio = new Audio(tadaSound);
    } else {
      audio = new Audio(drawSound);
    }
    setTimeout(() => {audio.play();}, 150);
  }

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
    <div className={classes.join(' ')} onClick={() => onClick()}>
      <ReactCSSTransitionGroup 
        transitionName='WinnerScreen-show'
        transitionEnterTimeout={1000}
        transitionLeaveTimeout={700}>
        {content}
      </ReactCSSTransitionGroup>       
    </div>
  );
};

WinnerScreen = connect(mapStateToProps, mapDispatchToProps)(WinnerScreen);

export default WinnerScreen;
