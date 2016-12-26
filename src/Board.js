import React from 'react';
import { connect } from 'react-redux';
import { markCell } from './Actions';
import './Board.css';

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

  return (
    <div key={i} className={classes} onClick={() => onCellClick(i)}>
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
