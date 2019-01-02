const game = require('./index');

test('when game starts, board is empty', () => {
  const emptyGame = [ [ null, null, null ],
                      [ null, null, null ],
                      [ null, null, null ] ];
  expect(game().newBoard()).toEqual(emptyGame);
});

test('when player', () => {
    // expect(1).toBe(2);
  });