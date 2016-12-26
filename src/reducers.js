const initialState = {
  board: new Array(9).fill(-1), 
  players: ['Player 1', 'Player 2'],
  currentPlayer: 0, 
  score: [0, 0, 0]
};

const copyState = (prevState) => {
  return {
    board: prevState.board.slice(),
    players: prevState.players.slice(),
    currentPlayer: prevState.currentPlayer,
    score: prevState.score.slice()
  };
};

export function reducer(prevState = initialState, action) {
  switch (action.type) {
  case 'MARK_CELL':
    const pos = action.position;
    const val = prevState.currentPlayer === 0 ? 1 : 0;
    if (prevState.board[pos] === -1) {
      const state = copyState(prevState); 
      state.board[pos] = val;
      state.currentPlayer = (state.currentPlayer + 1) % 2;
      return state;
    }
    return prevState;
  default:
    return prevState; 
  } 
};