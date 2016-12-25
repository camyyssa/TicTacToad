const initialState = {
  board: [1, -1, 0, 1, -1, -1, -1, -1, -1], 
  players: ['Player 1', 'Player 2'],
  currentPlayer: 0, 
  score: [0, 0, 0]
};

export function reducer(prevState = initialState, action) {
  return prevState;
}