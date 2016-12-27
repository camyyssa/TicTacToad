import { reducers } from './Main';
import * as Actions from '../Actions';

describe('Main', () => {
  it('Updates player name', () => {
    let prevState = {
      board: [-1, -1, -1, -1, -1, -1, -1, -1, -1], 
      players: ['P1', 'P2'],
      currentPlayer: 0, 
      score: [0, 0, 0]
    }; 

    let bob = 'bob';
    let nextState = reducers(prevState, Actions.setPlayerName(0, bob));

    expect(nextState.players[0]).toEqual(bob);
  });

  it ('Resets board and score', () => {
    let prevState = {
      board: [1, 0, 1, 0, 1, -1, -1, -1, -1], 
      players: ['P1', 'P2'],
      currentPlayer: 0, 
      score: [2, 3, 5]
    };

    let nextState = reducers(prevState, { type: 'RESET_SCORE' });

    expect(nextState.score).toEqual([0, 0, 0]);
  });
});