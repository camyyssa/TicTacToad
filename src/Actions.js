export const markCell = (pos) => ({
  type: 'MARK_CELL',
  position: pos
});

export const setPlayerName = (index, value) => ({
  type: 'SET_PLAYER_NAME', 
  index: index, 
  value: value
});

export const exitWinnerState = () => ({
  type: 'EXIT_WINNER_STATE'
});

export const resetBoard = () => ({
  type: 'RESET_BOARD'
});