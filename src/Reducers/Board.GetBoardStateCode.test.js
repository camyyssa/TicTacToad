import { getBoardStateCode, winnerCodes } from './Board';

describe('getBoardStateCode()', () => {
  it('identifies a draw', () => {
    const board = [1, 0, 1, 1, 1, 0, 0, 1, 0]; 

    expect(getBoardStateCode(board)).toEqual(winnerCodes.draw);
  });

  it('considers an empty board open', () => {
    const board = [-1, -1, -1, -1, -1, -1, -1, -1, -1]; 

    expect(getBoardStateCode(board)).toEqual(winnerCodes.noWinner);
  });

  it('detects open board', () => {
    const board = [1, 0, 1, 0, 1, -1, -1, -1, -1]; 

    expect(getBoardStateCode(board)).toEqual(winnerCodes.noWinner);
  });


  it('detects open board', () => {
    const board = [0, 0, -1, 1, -1, 1, -1, -1, -1]; 

    expect(getBoardStateCode(board)).toEqual(winnerCodes.noWinner);
  });

  it('detects open board', () => {
    const board = [0, 1, -1, 0, 1, -1, -1, -1, -1]; 

    expect(getBoardStateCode(board)).toEqual(winnerCodes.noWinner);
  });

  it('detects open board', () => {
    const board = [0, 1, 0, 0, -1, -1, -1, 1, -1]; 

    expect(getBoardStateCode(board)).toEqual(winnerCodes.noWinner);
  });

  it('detects x wins on row', () => {
    const board = [0, 0, -1, 1, 1, 1, -1, -1, -1]; 

    expect(getBoardStateCode(board)).toEqual(winnerCodes.x);
  });

  it('detects x wins on column', () => {
    const board = [0, 1, -1, 0, 1, -1, -1, 1, -1]; 

    expect(getBoardStateCode(board)).toEqual(winnerCodes.x);
  });

  it('detects x wins on diagonal', () => {
    const board = [1, 0, -1, 0, 1, -1, -1, -1, 1]; 

    expect(getBoardStateCode(board)).toEqual(winnerCodes.x);
  });

  it('detects 0 wins on row', () => {
    const board = [-1, -1, 1, 1, -1, -1, 0, 0, 0]; 

    expect(getBoardStateCode(board)).toEqual(winnerCodes.zero);
  });

  it('detects 0 wins on column', () => {
    const board = [0, 1, 0, 0, -1, -1, 0, 1, -1]; 

    expect(getBoardStateCode(board)).toEqual(winnerCodes.zero);
  });

  it('detects 0 wins on diagonal', () => {
    const board = [1, 1, 0, -1, 0, 1, 0, -1, -1]; 

    expect(getBoardStateCode(board)).toEqual(winnerCodes.zero);
  });
});