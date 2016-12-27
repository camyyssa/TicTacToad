import * as Actions from '../Actions';
import { copyState } from './Common';
import { boardReducers } from './Board';

describe('Board markers in non final conditions', () => {
  it('Ignores cell change request when cell is occupied by 1', () => {
    let prevState = {
      board: [1, -1, -1, -1, -1, -1, -1, -1, -1], 
      players: ['P1', 'P2'],
      currentPlayer: 1, 
      score: [0, 0, 0]
    }; 

    let nextStateAfter1 = boardReducers(prevState, Actions.markCell(0));
    expect(nextStateAfter1.board[0]).toEqual(prevState.board[0]);
  });

  it('Ignores cell change request when cell is occupied by 0', () => {
    let prevState = {
      board: [-1, 0, -1, -1, -1, -1, -1, -1, -1], 
      players: ['P1', 'P2'],
      currentPlayer: 0, 
      score: [0, 0, 0]
    }; 

    let nextStateAfter0 = boardReducers(prevState, Actions.markCell(1));
    expect(nextStateAfter0.board[1]).toEqual(prevState.board[1]);
  });

  it('Applies an x to the cell if it\'s P1\'s turn', () => {
    let prevState = {
      board: [-1, -1, -1, -1, -1, -1, -1, -1, -1], 
      players: ['P1', 'P2'],
      currentPlayer: 0, 
      score: [0, 0, 0]
    }; 

    let nextState = boardReducers(prevState, Actions.markCell(0));
    expect(nextState.board[0]).toEqual(1);
  });

  it('Applies a 0 to the cell if it\'s P2\'s turn', () => {
    let prevState = {
      board: [-1, -1, -1, -1, -1, -1, -1, -1, -1], 
      players: ['P1', 'P2'],
      currentPlayer: 1, 
      score: [0, 0, 0]
    }; 

    let nextState = boardReducers(prevState, Actions.markCell(0));
    expect(nextState.board[0]).toEqual(0);
  });

  it('Switches player when cell is free', () => {
    let prevState = {
      board: [-1, -1, -1, -1, -1, -1, -1, -1, -1], 
      players: ['P1', 'P2'],
      currentPlayer: 0, 
      score: [0, 0, 0]
    }; 

    let nextState1 = boardReducers(prevState, Actions.markCell(0));
    expect(nextState1.currentPlayer).toEqual(1);
  });

  it('Doesn\'t switch player when cell is occupied', () => {
    let prevState = {
      board: [0, 1, -1, -1, -1, -1, -1, -1, -1], 
      players: ['P1', 'P2'],
      currentPlayer: 0, 
      score: [0, 0, 0]
    }; 

    let nextState1 = boardReducers(prevState, Actions.markCell(0));
    expect(nextState1.currentPlayer).toEqual(prevState.currentPlayer);

    let nextState2 = boardReducers(prevState, Actions.markCell(1));
    expect(nextState2.currentPlayer).toEqual(prevState.currentPlayer);
  });

  it('Switches player correctly after repeated state changes', () => {
    let prevState = {
      board: [-1, -1, -1, -1, -1, -1, -1, -1, -1], 
      players: ['P1', 'P2'],
      currentPlayer: 0, 
      score: [0, 0, 0]
    }; 

    let nextState1 = boardReducers(prevState, Actions.markCell(0));
    expect(nextState1.currentPlayer).toEqual(1);

    prevState = nextState1;
    let nextState2 = boardReducers(prevState, Actions.markCell(1));
    expect(nextState2.currentPlayer).toEqual(0);

    prevState = nextState2;
    let nextState3 = boardReducers(prevState, Actions.markCell(3));
    expect(nextState3.currentPlayer).toEqual(1);

    prevState = nextState3;
    let nextState4 = boardReducers(prevState, Actions.markCell(4));
    expect(nextState4.currentPlayer).toEqual(0);
  });
});

describe('Board in final conditions', () => {
  it('Resets the board', () => {
    let prevState = {
      board: [1, 0, 1, 0, 1, -1, -1, -1, -1], 
      players: ['P1', 'P2'],
      currentPlayer: 0, 
      score: [2, 3, 5]
    };

    let nextState = boardReducers(prevState, Actions.resetBoard());

    expect(nextState.board).toEqual(new Array(9).fill(-1));
  });

  it('Detects wins on row', () => {
    let prevState = {
      board: [0, 0, -1, 1, -1, 1, -1, -1, -1], 
      players: ['P1', 'P2'],
      currentPlayer: 0, 
      score: [0, 0, 0]
    }; 

    let nextState = boardReducers(prevState, Actions.markCell(4));
    
    expect(nextState.score).toEqual([1, 0, 0]);
    expect(nextState.board).toEqual(new Array(9).fill(-1));
  });

  it('Detects wins on column', () => {
    let prevState = {
      board: [0, 1, -1, 0, 1, -1, -1, -1, -1], 
      players: ['P1', 'P2'],
      currentPlayer: 0, 
      score: [0, 0, 0]
    }; 

    let nextState = boardReducers(prevState, Actions.markCell(7));
    
    expect(nextState.score).toEqual([1, 0, 0]);
    expect(nextState.board).toEqual(new Array(9).fill(-1));
  });

  it('Detects wins on diagonal', () => {
    let prevState = {
      board: [1, 0, -1, 0, 1, -1, -1, -1, -1], 
      players: ['P1', 'P2'],
      currentPlayer: 0, 
      score: [0, 0, 0]
    }; 

    let nextState = boardReducers(prevState, Actions.markCell(8));

    expect(nextState.score).toEqual([1, 0, 0]);
    expect(nextState.board).toEqual(new Array(9).fill(-1));
  });

  it('Detects draws', () => {
    let prevState = {
      board: [1, 0, 1, 1, 1, 0, 0, -1, 0], 
      players: ['P1', 'P2'],
      currentPlayer: 0, 
      score: [0, 0, 0]
    };

    let nextState = boardReducers(prevState, Actions.markCell(7));

    expect(nextState.score).toEqual([0, 0, 1]);
    expect(nextState.board).toEqual(new Array(9).fill(-1));
  });
});
