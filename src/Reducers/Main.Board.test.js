import { reducers } from './Main';

describe('Board', () => {
  it.skip('Updates player name', () => {
    let prevState = {
      board: [-1, -1, -1, -1, -1, -1, -1, -1, -1], 
      players: ['P1', 'P2'],
      currentPlayer: 0, 
      score: [0, 0, 0]
    }; 

    let bob = 'bob';

    let nextState = reducers(prevState, {
      type: 'SET_PLAYER_NAME', 
      index: 0, 
      value: bob
    });
    expect(nextState.players[0]).toEqual(bob);
  });
});