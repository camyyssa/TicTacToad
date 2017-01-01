import { boardReducers } from './Board';
import { copyState } from './Common';

const initialState = {
  board: new Array(9).fill(-1), 
  players: ['Froggy', 'Fishy'],
  currentPlayer: 0, 
  score: [0, 0, 0],
  announceWinner: -1
};

export function reducers(prevState = initialState, action) {
  switch (action.type) {
  case 'MARK_CELL':
    return boardReducers(prevState, action);
  case 'EXIT_WINNER_STATE':
    return boardReducers(prevState, action);
  case 'SET_PLAYER_NAME': {
    const state = copyState(prevState);
    state.players[action.index] = action.value;
    return state;
  }
  case 'RESET_SCORE': {
    const state = copyState(prevState);
    state.score = [0, 0, 0];
    return state; 
  }
  default:
    return prevState; 
  } 
};