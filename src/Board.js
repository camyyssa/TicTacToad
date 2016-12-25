import React from 'react';
import { connect } from 'react-redux';
import './Board.css';

function cellStateToCSSClass(s) {
  if (s === 0) {
    return '0';
  } else if (s === 1) {
    return 'x';
  }
}

function onCellClick(key) {
  console.log(key);
}

function renderCell(board, val, i) {
  // Prepare classes that this cell should have
  let classList = ['Board-cell'];
  if (board[i] !== -1) {
    classList.push(`Board-${cellStateToCSSClass(board[i])}`);
  };
  let classes = classList.join(' ');

  return (
    <div key={i} className={classes} onClick={onCellClick.bind(null, i)}>
    </div>
  );
}

function mapStateToProps(state) {
  return { board: state.board };
}

let Board = ({ board, dispatch }) => {
  return (
    <div className="Board">
      {board.map((val, i) => renderCell(board, val, i))}
    </div>
  );
};

Board = connect(
  mapStateToProps
)(Board);

export default Board;
