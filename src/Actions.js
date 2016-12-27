export const markCell = (pos) => ({
  type: 'MARK_CELL',
  position: pos
});

export const setPlayerName = (index, value) => ({
  type: 'SET_PLAYER_NAME', 
  index: index, 
  value: value
});

export const resetScore = () => ({
  type: 'RESET_SCORE'
});

export const resetBoard = () => ({
  type: 'RESET_BOARD'
});