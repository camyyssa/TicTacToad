import { reducers } from './Main';

describe('Board markers set correctly', () => {
  it('Ignores cell change request when cell is occupied by 1', () => {
    let prevState = {
      board: [1, -1, -1, -1, -1, -1, -1, -1, -1], 
      players: ['P1', 'P2'],
      currentPlayer: 1, 
      score: [0, 0, 0]
    }; 

    let nextStateAfter1 = reducers(prevState, {type:'MARK_CELL', position:0});
    expect(nextStateAfter1.board[0]).toEqual(prevState.board[0]);
  });

  it('Ignores cell change request when cell is occupied by 0', () => {
    let prevState = {
      board: [-1, 0, -1, -1, -1, -1, -1, -1, -1], 
      players: ['P1', 'P2'],
      currentPlayer: 0, 
      score: [0, 0, 0]
    }; 

    let nextStateAfter0 = reducers(prevState, {type:'MARK_CELL', position:1});
    expect(nextStateAfter0.board[1]).toEqual(prevState.board[1]);
  });

  it('Applies an x to the cell if it\'s P1\'s turn', () => {
    let prevState = {
      board: [-1, -1, -1, -1, -1, -1, -1, -1, -1], 
      players: ['P1', 'P2'],
      currentPlayer: 0, 
      score: [0, 0, 0]
    }; 

    let nextState = reducers(prevState, {type:'MARK_CELL', position:0});
    expect(nextState.board[0]).toEqual(1);
  });

  it('Applies a 0 to the cell if it\'s P2\'s turn', () => {
    let prevState = {
      board: [-1, -1, -1, -1, -1, -1, -1, -1, -1], 
      players: ['P1', 'P2'],
      currentPlayer: 1, 
      score: [0, 0, 0]
    }; 

    let nextState = reducers(prevState, {type:'MARK_CELL', position:0});
    expect(nextState.board[0]).toEqual(0);
  });

  it('Switches player when cell is free', () => {
    let prevState = {
      board: [-1, -1, -1, -1, -1, -1, -1, -1, -1], 
      players: ['P1', 'P2'],
      currentPlayer: 0, 
      score: [0, 0, 0]
    }; 

    let nextState1 = reducers(prevState, {type:'MARK_CELL', position:0});
    expect(nextState1.currentPlayer).toEqual(1);
  });

  it('Doesn\'t switch player when cell is occupied', () => {
    let prevState = {
      board: [0, 1, -1, -1, -1, -1, -1, -1, -1], 
      players: ['P1', 'P2'],
      currentPlayer: 0, 
      score: [0, 0, 0]
    }; 

    let nextState1 = reducers(prevState, {type:'MARK_CELL', position:0});
    expect(nextState1.currentPlayer).toEqual(prevState.currentPlayer);

    let nextState2 = reducers(prevState, {type:'MARK_CELL', position:1});
    expect(nextState2.currentPlayer).toEqual(prevState.currentPlayer);
  });

  it('Switches player correctly after repeated state changes', () => {
    let prevState = {
      board: [-1, -1, -1, -1, -1, -1, -1, -1, -1], 
      players: ['P1', 'P2'],
      currentPlayer: 0, 
      score: [0, 0, 0]
    }; 

    let nextState1 = reducers(prevState, {type:'MARK_CELL', position:0});
    expect(nextState1.currentPlayer).toEqual(1);

    prevState = nextState1;
    let nextState2 = reducers(prevState, {type:'MARK_CELL', position:1});
    expect(nextState2.currentPlayer).toEqual(0);

    prevState = nextState2;
    let nextState3 = reducers(prevState, {type:'MARK_CELL', position:2});
    expect(nextState3.currentPlayer).toEqual(1);

    prevState = nextState3;
    let nextState4 = reducers(prevState, {type:'MARK_CELL', position:3});
    expect(nextState4.currentPlayer).toEqual(0);
  });
});
