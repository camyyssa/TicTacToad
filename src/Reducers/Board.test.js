import * as Actions from '../Actions';
import { copyState } from './Common';
import { boardReducers } from './Board';

describe('Board markers in non final conditions', () => {
  it('Ignores cell change request when cell is occupied by 1', () => {
    const prevState = {
      board: [1, -1, -1, -1, -1, -1, -1, -1, -1], 
      players: ['P1', 'P2'],
      currentPlayer: 1, 
      score: [0, 0, 0],
      announceWinner: -1
    }; 

    const nextStateAfter1 = boardReducers(prevState, Actions.markCell(0));
    expect(nextStateAfter1.board[0]).toEqual(prevState.board[0]);
  });

  it('Ignores cell change request when cell is occupied by 0', () => {
    const prevState = {
      board: [-1, 0, -1, -1, -1, -1, -1, -1, -1], 
      players: ['P1', 'P2'],
      currentPlayer: 0, 
      score: [0, 0, 0],
      announceWinner: -1
    }; 

    const nextStateAfter0 = boardReducers(prevState, Actions.markCell(1));
    expect(nextStateAfter0.board[1]).toEqual(prevState.board[1]);
  });

  it('Applies an x to the cell if it\'s P1\'s turn', () => {
    const prevState = {
      board: [-1, -1, -1, -1, -1, -1, -1, -1, -1], 
      players: ['P1', 'P2'],
      currentPlayer: 0, 
      score: [0, 0, 0],
      announceWinner: -1
    }; 

    const nextState = boardReducers(prevState, Actions.markCell(0));
    expect(nextState.board[0]).toEqual(1);
  });

  it('Applies a 0 to the cell if it\'s P2\'s turn', () => {
    const prevState = {
      board: [-1, -1, -1, -1, -1, -1, -1, -1, -1], 
      players: ['P1', 'P2'],
      currentPlayer: 1, 
      score: [0, 0, 0],
      announceWinner: -1
    }; 

    const nextState = boardReducers(prevState, Actions.markCell(0));
    expect(nextState.board[0]).toEqual(0);
  });

  it('Switches player when cell is free', () => {
    const prevState = {
      board: [-1, -1, -1, -1, -1, -1, -1, -1, -1], 
      players: ['P1', 'P2'],
      currentPlayer: 0, 
      score: [0, 0, 0],
      announceWinner: -1
    }; 

    const nextState1 = boardReducers(prevState, Actions.markCell(0));
    expect(nextState1.currentPlayer).toEqual(1);
  });

  it('Doesn\'t switch player when cell is occupied', () => {
    const prevState = {
      board: [0, 1, -1, -1, -1, -1, -1, -1, -1], 
      players: ['P1', 'P2'],
      currentPlayer: 0, 
      score: [0, 0, 0],
      announceWinner: -1
    }; 

    const nextState1 = boardReducers(prevState, Actions.markCell(0));
    expect(nextState1.currentPlayer).toEqual(prevState.currentPlayer);

    const nextState2 = boardReducers(prevState, Actions.markCell(1));
    expect(nextState2.currentPlayer).toEqual(prevState.currentPlayer);
  });

  it('Switches player correctly after repeated state changes', () => {
    let prevState = {
      board: [-1, -1, -1, -1, -1, -1, -1, -1, -1], 
      players: ['P1', 'P2'],
      currentPlayer: 0, 
      score: [0, 0, 0],
      announceWinner: -1
    }; 

    const nextState1 = boardReducers(prevState, Actions.markCell(0));
    expect(nextState1.currentPlayer).toEqual(1);

    prevState = nextState1;
    const nextState2 = boardReducers(prevState, Actions.markCell(1));
    expect(nextState2.currentPlayer).toEqual(0);

    prevState = nextState2;
    const nextState3 = boardReducers(prevState, Actions.markCell(3));
    expect(nextState3.currentPlayer).toEqual(1);

    prevState = nextState3;
    const nextState4 = boardReducers(prevState, Actions.markCell(4));
    expect(nextState4.currentPlayer).toEqual(0);
  });
});

describe('Board in final conditions', () => {
  it('Resets the board', () => {
    const prevState = {
      board: [1, 0, 1, 0, 1, -1, -1, -1, -1], 
      players: ['P1', 'P2'],
      currentPlayer: 0, 
      score: [2, 3, 5],
      announceWinner: -1
    };

    const nextState = boardReducers(prevState, Actions.resetBoard());

    expect(nextState.board).toEqual(new Array(9).fill(-1));
  });

  it('Detects x wins on row', () => {
    const prevState = {
      board: [0, 0, -1, 1, -1, 1, -1, -1, -1], 
      players: ['P1', 'P2'],
      currentPlayer: 0, 
      score: [0, 0, 0],
      announceWinner: -1
    }; 

    const nextState = boardReducers(prevState, Actions.markCell(4));
    
    expect(nextState.announceWinner).toEqual(0);
  });

  it('Detects x wins on column', () => {
    const prevState = {
      board: [0, 1, -1, 0, 1, -1, -1, -1, -1], 
      players: ['P1', 'P2'],
      currentPlayer: 0, 
      score: [0, 0, 0],
      announceWinner: -1
    }; 

    const nextState = boardReducers(prevState, Actions.markCell(7));
    
    expect(nextState.announceWinner).toEqual(0);
  });

  it('Detects x wins on diagonal', () => {
    const prevState = {
      board: [1, 0, -1, 0, 1, -1, -1, -1, -1], 
      players: ['P1', 'P2'],
      currentPlayer: 0, 
      score: [0, 0, 0],
      announceWinner: -1
    }; 

    const nextState = boardReducers(prevState, Actions.markCell(8));
    
    expect(nextState.announceWinner).toEqual(0);
  });

  it('Detects 0 wins on row', () => {
    const prevState = {
      board: [-1, -1, 1, 1, -1, -1, 0, -1, 0], 
      players: ['P1', 'P2'],
      currentPlayer: 1, 
      score: [0, 0, 0],
      announceWinner: -1
    }; 

    const nextState = boardReducers(prevState, Actions.markCell(7));
    
    expect(nextState.announceWinner).toEqual(1);
  });

  it('Detects 0 wins on column', () => {
    const prevState = {
      board: [0, 1, 0, 0, -1, -1, -1, 1, -1], 
      players: ['P1', 'P2'],
      currentPlayer: 1, 
      score: [0, 0, 0],
      announceWinner: -1
    }; 

    const nextState = boardReducers(prevState, Actions.markCell(6));
    
    expect(nextState.announceWinner).toEqual(1);
  });

  it('Detects 0 wins on diagonal', () => {
    const prevState = {
      board: [1, 1, 0, -1, -1, 1, 0, -1, -1], 
      players: ['P1', 'P2'],
      currentPlayer: 1, 
      score: [0, 0, 0],
      announceWinner: -1
    }; 

    const nextState = boardReducers(prevState, Actions.markCell(4));
    
    expect(nextState.announceWinner).toEqual(1);
  });

  it('Detects a draw', () => {
    const prevState = {
      board: [1, 0, 1, 1, 1, 0, 0, 1, -1], 
      players: ['P1', 'P2'],
      currentPlayer: 1, 
      score: [0, 0, 0],
      announceWinner: -1
    }; 

    const nextState = boardReducers(prevState, Actions.markCell(8));
    
    expect(nextState.announceWinner).toEqual(2);
  });
});
