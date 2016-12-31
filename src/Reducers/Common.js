/**
 * Get a deep copy of the previous state. 
*/
export const copyState = (prevState) => {
  return {
    board: prevState.board.slice(),
    players: prevState.players.slice(),
    currentPlayer: prevState.currentPlayer,
    score: prevState.score.slice(),
    announceWinner: prevState.announceWinner
  };
};

/**
 * Get a clean board. 
 */
export const cleanBoard = new Array(9).fill(-1);