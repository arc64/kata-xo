
const game = () => {

    const newBoard = () => {
        let row = [null, null, null];
        let board = [row.slice(), 
                    row.slice(), 
                    row.slice()];
        return board;
    };
    
    const takeTurn = (token, board, row, column) => {
        if (board[row][column] == null) {
            board[row][column] = token;
        } else {
            // how should you do error messages?
            console.error('This position is taken, please pick a empty space!')
        }
        return board;
    };

    // players
    let player1 = 'X';
    let player2 = 'O';
    let board = newBoard;

    // ask player for token
    // takeTurn
    // check win
    // if not win change player

    return {
        newBoard: newBoard,
        takeTurn: takeTurn
    }
};

module.exports = game;
