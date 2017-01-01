import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { winnerCodes } from '../Common';
import { exitWinnerState } from '../Actions';
import './WinnerScreen.css';

const tadaAsset = require('../../assets/tada.mp3');
const drawAsset = require('../../assets/draw.mp3');

const tadaSound = new Audio(tadaAsset);
const drawSound = new Audio(drawAsset);

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

    if (winnerIndex < 2) {
      setTimeout(() => {tadaSound.play();}, 200);
    } else {
      setTimeout(() => {drawSound.play();}, 200);
    }
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
