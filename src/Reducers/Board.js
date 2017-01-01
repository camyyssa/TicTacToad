import { copyState, cleanBoard } from './Common';
import { winnerCodes } from '../Common';

/**
 * Switches between the two players. 
 * In-place: Does not return a new state object
 */
const switchPlayer = (state) => {
  state.currentPlayer = (state.currentPlayer + 1) % 2;
  return state;
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
export const checkLine = (line, board) => {
  if ( board[line[0]] > -1
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
export const getBoardStateCode = (board) => { 
  let winner = -1;
  winningLines.forEach((line) => {
    if (checkLine(line, board)) {
      winner = board[line[0]] === 1 ? winnerCodes.x : winnerCodes.zero;
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
  const stateCode = getBoardStateCode(state.board); 
  if (stateCode === winnerCodes.noWinner) {
    switchPlayer(state);
    state.announceWinner = winnerCodes.noWinner;
    return state;
  } 
  
  state.announceWinner = stateCode;
  return state; 
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
  case 'EXIT_WINNER_STATE': {
    const state = copyState(prevState);
    state.score[state.announceWinner] += 1;
    state.board = cleanBoard;
    state.announceWinner = winnerCodes.noWinner;
    return state;
  }
  case 'RESET_BOARD': {
    const state = copyState(prevState);
    state.board = cleanBoard;
    return state;
  }
  default: {
    return prevState; 
  }
  }
};