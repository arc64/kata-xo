const env = require('./index');
const game = env();

const emptyGame = [ [ null, null, null ],
                      [ null, null, null ],
                      [ null, null, null ] ];

test('when game starts, board is empty', () => {
  expect(env().newBoard()).toEqual(emptyGame);
});

// TODO: Can you build up and tear down in jest better than this?

test('when player plays a token in a slot that is not taken, the board is updated', () => {   const game = env(); 
  let board = game.newBoard();
  let player1 = 'X';
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
  let player1 = 'X';
  let player2 = 'O';
  let row = 1;
  let column = 2;

  const firstTurnTaken = [ [ null, null, null ],
                    [ null, null, player2 ],
                    [ null, null, null ] ];

  const secondTurnTaken = [ [ null, null, null ],
                    [ null, null, player1 ],
                    [ null, null, null ] ];

  expect(board).toEqual(emptyGame);
  expect(game.takeTurn(player2, board, row, column)).toEqual(firstTurnTaken);
  expect(game.takeTurn(player1, board, row, column)).not.toEqual(secondTurnTaken);
});

// test('when player plays a token in a slot that is taken, the user is notified', () => {
//   expect(1).toBe(2);
// });



// test('when player plays a token in a slot that is not taken, the game switches player', () => {
//   expect(1).toBe(2);
// });