
const game = () => {

    const newBoard = () => {
        let row = [' ', ' ', ' '];
        let board = [row.slice(), 
                    row.slice(), 
                    row.slice()];
        return board;
    };
    
    const takeTurn = (token, board, row, column) => {
        if (board[row][column] == ' ') {
            board[row][column] = token;
        } else {
            // how should you do error messages?
            console.error('This position is taken, please pick a empty space!')
        }
        return board;
    };

    const matches = (tokens) => {
        if (tokens[0] == tokens[1] && tokens[0] == tokens[2]){
            return true;
        }
        return false;
    };

    const hasWinCondition = (board) => {
        // assume that win is check on each turn, 
        // winner is assumed to be last turn haver

        // TODO: could just check the rows/columns/diagonals 
        // that last token was placed
        
        const row1 = board[0];
        const row2 = board[1];
        const row3 = board[2];

        if (matches(row1) || matches(row2) || matches(row3))
            return true;
        
        const colummn1 = [board[0][0], board[1][0], board[2][0]];
        const colummn2 = [board[0][1], board[1][1], board[2][1]];
        const colummn3 = [board[0][2], board[1][2], board[2][2]];

        if (matches(colummn1) || matches(colummn2) || matches(colummn3))
            return true;

        const diagonal1 = [board[0][0], board[1][1], board[2][2]];
        const diagonal2 = [board[0][2], board[1][1], board[2][0]];

        if (matches(diagonal1) || matches(diagonal2))
            return true;
        
        return false
    };


    // ask player for token
    // takeTurn and then check for win 
    // if not win change player


    return {
        newBoard: newBoard,
        takeTurn: takeTurn, 
        hasWinCondition: hasWinCondition
    }
};

module.exports = game;
