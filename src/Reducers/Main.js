const initialState = {
  board: new Array(9).fill(-1), 
  players: ['Player 1', 'Player 2'],
  currentPlayer: 0, 
  score: [0, 0, 0]
};

/**
 * Get a deep copy of the previous state. 
*/
const copyState = (prevState) => {
  return {
    board: prevState.board.slice(),
    players: prevState.players.slice(),
    currentPlayer: prevState.currentPlayer,
    score: prevState.score.slice()
  };
};

/**
 * Resets the board array to a clean state. 
 * In-place: Does not return a new state object 
 */
const resetBoard = (state) => {
  state.board = new Array(9).fill(-1);
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

export function reducers(prevState = initialState, action) {
  switch (action.type) {
  case 'MARK_CELL':
    const pos = action.position;
    const val = prevState.currentPlayer === 0 ? 1 : 0;
    if (prevState.board[pos] === -1) {
      const state = copyState(prevState); 
      state.board[pos] = val;
      switchPlayer(state);
      return state;
    }
    return prevState;
  default:
    return prevState; 
  } 
};