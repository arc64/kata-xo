const game = require('./game')();

const emptyGame = [ [ ' ', ' ', ' ' ],
                    [ ' ', ' ', ' ' ],
                    [ ' ', ' ', ' ' ] ];

const player1 = 'X';
const player2 = 'O';

test('when game starts, board is empty', () => {
  expect(game.newBoard()).toEqual(emptyGame);
});

// TODO: Can you build up and tear down in jest better than this?

test('when player plays a token in a slot that is not taken, the board is updated', () => {   
  let board = game.newBoard();
  let row = 1;
  let column = 2;

  const turnTaken = [ [ ' ', ' ', ' ' ],
                      [ ' ', ' ', player1 ],
                      [ ' ', ' ', ' ' ] ];

  expect(board).toEqual(emptyGame);
  expect(game.takeTurn(player1, board, row, column)).toEqual(true);
  expect(board).toEqual(turnTaken);
});

test('when player plays a token in a slot that is taken, the board remains unchanged', () => {
  let board = game.newBoard();
  let row = 1;
  let column = 2;

  const firstTurnTaken = [  [ ' ', ' ', ' ' ],
                            [ ' ', ' ', player2 ],
                            [ ' ', ' ', ' ' ] ];

  const secondTurnTaken = [ [ ' ', ' ', ' ' ],
                            [ ' ', ' ', player1 ],
                            [ ' ', ' ', ' ' ] ];

  expect(board).toEqual(emptyGame);
  expect(game.takeTurn(player2, board, row, column)).toEqual(true);
  expect(board).toEqual(firstTurnTaken);
  expect(game.takeTurn(player1, board, row, column)).toEqual(false);
  expect(board).not.toEqual(secondTurnTaken);
});

test('when player plays a token in a slot that creates a win condition, the game is won', () => {
  let board = [ [ ' ', ' ', player1 ],
                [ ' ', player2, player2 ],
                [ player1, ' ', ' ' ] ];

  let row = 1;
  let column = 0;

  let turnTaken = [ [ ' ', ' ', player1 ],
                [ player2, player2, player2 ],
                [ player1, ' ', ' ' ] ];

  expect(game.hasWinCondition(emptyGame)).toEqual(false);
  expect(game.hasWinCondition(board)).toEqual(false);
  expect(game.takeTurn(player2, board, row, column)).toEqual(true);
  expect(board).toEqual(turnTaken);
  expect(game.hasWinCondition(board)).toEqual(true);
  
});

test('when the board is full, but there is no winner it is a draw', () => {
  let board = [ [ ' ', ' ', player1 ],
                [ ' ', player2, player2 ],
                [ player1, ' ', ' ' ] ];
  let fullBoard = [ [ player1, player1, player1 ],
                [ player1, player2, player2 ],
                [ player1, player1, player1 ] ];
  let row = 1;
  let column = 0;

  expect(game.boardIsFull(emptyGame)).toEqual(false);
  expect(game.boardIsFull(board)).toEqual(false);
  game.takeTurn(player2, board, row, column);
  expect(game.boardIsFull(board)).toEqual(false);
  expect(game.boardIsFull(fullBoard)).toEqual(true);

});
