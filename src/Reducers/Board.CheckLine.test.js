import { checkLine } from './Board';

describe('checkLine function', () => {
  it('Doesn\'t respond to -1s', () => {
    let line = [0, 1, 2];
    let board = [-1, -1, -1];

    expect(checkLine(line, board)).toEqual(false);
  });

  it('Doesn\'t activate when all values are not the same', () => {
    let line = [0, 1, 2];
    let board = [1, 0, 1];

    expect(checkLine(line, board)).toEqual(false);
  });

  it('Doesn\'t activate when all values are not the same', () => {
    let line = [0, 1, 2];
    let board = [0, 1, 0];

    expect(checkLine(line, board)).toEqual(false);
  });

  it('Doesn\'t activate when all values are not the same', () => {
    let line = [0, 1, 2];
    let board = [0, 1, 1];

    expect(checkLine(line, board)).toEqual(false);
  });

  it('Doesn\'t activate when all values are not the same', () => {
    let line = [0, 1, 2];
    let board = [1, 1, 0];

    expect(checkLine(line, board)).toEqual(false);
  });

  it('Activates on 0', () => {
    let line = [0, 1, 2];
    let board = [0, 0, 0];

    expect(checkLine(line, board)).toEqual(true);
  });

  it('Activates on 1', () => {
    let line = [0, 1, 2];
    let board = [1, 1, 1];

    expect(checkLine(line, board)).toEqual(true);
  });
});