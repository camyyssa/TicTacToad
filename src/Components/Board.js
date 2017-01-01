import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { markCell } from '../Actions';
import './Board.css';

const fishImage = require('../../assets/fish.png');
const toadImage = require('../../assets/toad.png');

function cellStateToCSSClass(s) {
  if (s === 0) {
    return '0';
  } else if (s === 1) {
    return 'x';
  }
}

function renderCell(board, i, onCellClick) {
  // Prepare classes that this cell should have
  let classList = ['Board-cell'];
  if (board[i] !== -1) {
    classList.push(`Board-${cellStateToCSSClass(board[i])}`);
  };
  let classes = classList.join(' ');

  let content = '';
  if (board[i] === 1) {
    content = (<img src={toadImage} alt='froggy' className='Board-marker'></img>);
  } else if (board[i] === 0) {
    content = (<img src={fishImage} alt='fishy' className='Board-marker'></img>);    
  }

  return (
    <div key={i} className={classes} onClick={() => onCellClick(i)}>
      <ReactCSSTransitionGroup 
        transitionName="Board-marker-place" 
        transitionEnterTimeout={500} 
        transitionLeaveTimeout={700}>
        {content}
      </ReactCSSTransitionGroup>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { board: state.board };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCellClick: (i) => {
      dispatch(markCell(i));
    }
  };
};

let Board = ({ board, onCellClick }) => {
  return (
    <div className="Board">
      {board.map((val, i) => renderCell(board, i, onCellClick))}
    </div>
  );
};

Board = connect(mapStateToProps, mapDispatchToProps)(Board);

export default Board;
