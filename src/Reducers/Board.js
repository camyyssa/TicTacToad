import { copyState, cleanBoard } from './Common';

/**
 * Switches between the two players. 
 * In-place: Does not return a new state object
 */
const switchPlayer = (state) => {
  state.currentPlayer = (state.currentPlayer + 1) % 2;
  return state;
};

/**
 * Constants defining the current state of the board: whether it's still
 * open (no), whether someone won (x or zero) of whether it's a draw
 */
const winnerCodes = {
  noWinner: -1,
  x: 0,
  zero: 1,
  draw: 2
};

/**
 * The list of positions on the board that need to contain the same symbol 
 * in order for one of the players to win the game
 */
const winningLines = [
  [0, 1, 2], 
  [3, 4, 5], 
  [6, 7, 8], 
  [0, 3, 6], 
  [1, 4, 7], 
  [2, 5, 8], 
  [0, 4, 8], 
  [2, 4, 6]
];

/**
 * Given a list of indices on the board, determines whether the values
 * present there are equal
 */
const checkLine = (line, board) => {
  if ( board[line[0]] > 0
   && board[line[0]] === board[line[1]] 
   && board[line[1]] === board[line[2]]) {
    return true;
  };
  return false;
};

/**
 * Determines whether our current board is in a winning state or a draw, and
 * returns a code accordingly
 */
const getBoardStateCode = (board) => { 
  let winner = -1;
  winningLines.forEach((line) => {
    if (checkLine(line, board)) {
      winner = board[line[0]] === 1 ? winnerCodes.x : winnerCodes.y;
    }
  });

  // Do we have a winner?
  if (winner > -1) {
    return winner;
  }

  // Are we in a draw situation?
  if (board.indexOf(-1) < 0) {
    return winnerCodes.draw;
  }

  return winnerCodes.noWinner;
};

/**
 * Given the state (whether a player won or if it's a draw) of our board after a 
 * move, updates the state. 
 * In-place: Does not return a new state object
 */
const updateState = (state) => {
  switch (getBoardStateCode(state.board)) {
  case winnerCodes.x: {
    state.score[0] += 1;
    state.board = cleanBoard;
    return state;
  }
  case winnerCodes.zero: {
    state.score[1] += 1;
    state.board = cleanBoard;
    return state;
  }
  case winnerCodes.draw: {
    state.score[2] += 1;
    state.board = cleanBoard;
    return state;
  }
  default: 
    switchPlayer(state);
    return state;
  };
};

export function boardReducers(prevState, action) {
  switch (action.type) {
  case 'MARK_CELL': {
    const pos = action.position;
    const val = prevState.currentPlayer === 0 ? 1 : 0;
    if (prevState.board[pos] === -1) {
      const state = copyState(prevState); 
      state.board[pos] = val;
      return updateState(state);
    }
    return prevState;
  }
  case 'RESET_BOARD': {
    const state = copyState(prevState);
    state.board = cleanBoard;
    return state;
  }
  default:
    return prevState; 
  }
};