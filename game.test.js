const env = require('./index');
const game = require('./game')();

const emptyGame = [ [ null, null, null ],
                    [ null, null, null ],
                    [ null, null, null ] ];

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

  const turnTaken = [ [ null, null, null ],
                      [ null, null, player1 ],
                      [ null, null, null ] ];

  expect(board).toEqual(emptyGame);
  expect(game.takeTurn(player1, board, row, column)).toEqual(turnTaken);
});

test('when player plays a token in a slot that is taken, the board remains unchanged', () => {
  let board = game.newBoard();
  let row = 1;
  let column = 2;

  const firstTurnTaken = [  [ null, null, null ],
                            [ null, null, player2 ],
                            [ null, null, null ] ];

  const secondTurnTaken = [ [ null, null, null ],
                            [ null, null, player1 ],
                            [ null, null, null ] ];

  expect(board).toEqual(emptyGame);
  expect(game.takeTurn(player2, board, row, column)).toEqual(firstTurnTaken);
  expect(game.takeTurn(player1, board, row, column)).not.toEqual(secondTurnTaken);
});

test('when player plays a token in a slot that creates a win condition, the game is won', () => {
  let board = [ [ null, null, player1 ],
                [ null, player2, player2 ],
                [ player1, null, null ] ];
  let row = 1;
  let column = 0;

  let turnTaken = [ [ null, null, player1 ],
                [ player2, player2, player2 ],
                [ player1, null, null ] ];

  expect(game.hasWinCondition(board)).toEqual(false);
  expect(game.takeTurn(player2, board, row, column)).toEqual(turnTaken);
  expect(game.hasWinCondition(board)).toEqual(true);
  
});

test('when player plays a token in a slot that creates no win condition, the game switches player', () => {

  
});




// test('when player plays a token in a slot that is taken, the user is notified', () => {
//   expect(1).toBe(2);
// });

// test('when player plays a token in a slot that creates a win condition, the player is notified', () => {
//   expect(1).toBe(2);
// });

// test('when the game switches player, the player is notified', () => {
//   expect(1).toBe(2);
// });
