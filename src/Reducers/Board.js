import { copyState, cleanBoard } from './Common';

/**
 * Resets the board array to a clean state. 
 * In-place: Does not return a new state object 
 */
const resetBoard = (state) => {
  state.board = cleanBoard;
  return state;
};

/**
 * Switches between the two players. 
 * In-place: Does not return a new state object
 */
const switchPlayer = (state) => {
  state.currentPlayer = (state.currentPlayer + 1) % 2;
  return state;
};

/**
 * Set one of the two players as the next. 
 * In-place: Does not return a new state object
 */
const setPlayer = (player, state) => {
  state.currentPlayer = player;
  return state;
};

/**
 * Constants defining the current state of the board: whether it's still
 * open (no), whether someone won (x or zero) of whether it's a draw
 */
export const winnerCodes = {
  noWinner: -1,
  x: 0,
  zero: 1,
  draw: 2
};

/**
 * The list of positions on the board that need to contain the same symbol 
 * in order for one player to win the game
 */
const winningPositions = [
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
const arePositionsEqual = (positions, board) => {
  if ( board[positions[0]] > 0
   && board[positions[0]] === board[positions[1]] 
   && board[positions[1]] === board[positions[2]]) {
    return true;
  };
  return false;
};

export const checkFinal = (board) => { 
  let winner = -1;
  winningPositions.forEach((positions) => {
    if (arePositionsEqual(positions, board)) {
      winner = board[positions[0]] === 1 ? winnerCodes.x : winnerCodes.y;
    }
  });

  if (winner > -1) {
    return winner;
  }

  if (board.indexOf(-1) < 0) {
    return winnerCodes.draw;
  }

  return winnerCodes.noWinner;
};

export function boardReducers(prevState = initialState, action) {
  switch (action.type) {
  case 'MARK_CELL': {
    const pos = action.position;
    const val = prevState.currentPlayer === 0 ? 1 : 0;
    if (prevState.board[pos] === -1) {
      const state = copyState(prevState); 
      state.board[pos] = val;
      let finalState = checkFinal(state.board);
      switch (finalState) {
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