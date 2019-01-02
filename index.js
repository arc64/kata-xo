
const game = () => {

    const newBoard = () => {
        let row = [null, null, null];
        let board = [row, row, row];
        return board;
    };
    
    // players
    let player1 = 'X';
    let player2 = 'O';

    

    return {
        newBoard: newBoard
    }
};

module.exports = game;
