const readline = require('readline');
const game = require('./game');

const gameInterface = (game) => {
    let board = game.newBoard();
    const inputKeyMap = { 
                        'q': { row:  0, column: 0 }, 
                        'w': { row:  0, column: 1 },
                        'e' : { row:  0, column: 2 },
                        'a' : { row:  1, column: 0 },
                        's' : { row:  1, column: 1 },
                        'd' : { row:  1, column: 2 },
                        'z' : { row:  2, column: 0 },
                        'x' : { row:  2, column: 1 },
                        'c' : { row:  2, column: 2} 
                    };

    const showSplash = () => {
        console.clear();
        console.log('\n \n     Let\'s play Tic Tac Toe! ');
        console.log('================================================= \n');
    };

    const showDirections = () => {
        console.log('     Remember to get three in a row to win!');
        console.log('\n');
        console.log('=================================================');
        console.log('||   Use these keys to place your token:       ||'); 
        console.log('||                  |   |                      ||');        
        console.log('||                Q | W | E                    ||');            
        console.log('||               ___|___|___                   ||');                 
        console.log('||                A | S | D                    ||');             
        console.log('||               ___|___|___                   ||');                  
        console.log('||                Z | X | C                    ||');                      
        console.log('||                  |   |                      ||'); 
        console.log('================================================='); 
    };

    const showBoard = () => {
        let row1 = board[0];
        let row2 = board[1];
        let row3 = board[2];
        console.log('||                |        |                   ||');
        console.log('||            %s   |    %s   |    %s              ||', row1[0], row1[1], row1[2]);
        console.log('||                |        |                   ||');
        console.log('||         ------------------------            ||'); 
        console.log('||                |        |                   ||');
        console.log('||            %s   |    %s   |    %s              ||', row2[0], row2[1], row2[2]);
        console.log('||                |        |                   ||');
        console.log('||         ------------------------            ||');
        console.log('||                |        |                   ||');
        console.log('||            %s   |    %s   |    %s              ||', row3[0], row3[1], row3[2]);
        console.log('||                |        |                   ||');
        console.log('================================================= \n');
    };

    const showCurrentPlayer = () => {
        console.log('     Player %s - it is your turn! \n', game.getCurrentPlayer());
    };

    const mapKeysToCoords = (input) => {
        const result = inputKeyMap[input.toLowerCase()];
        if(result) 
            return result;
        return {};
    };

    const playGame = (rl) => {
        showDirections();
        showBoard();
        showCurrentPlayer();

        rl.question('Where would you like to place your token? (type key, then press enter) \n', (answer) => {
            console.log('=================================================');
            let coords = mapKeysToCoords(answer);
            // Did use use a key we understand?
            if (Object.keys(coords).length) {
                game.takeTurn(game.getCurrentPlayer(), board, coords.row, coords.column)
                // check if they won
                if (game.hasWinCondition(board)) {
                    showBoard();
                    console.log('     Player %s - YOU WON! \n', game.getCurrentPlayer());
                    // TODO: fireworks
                    rl.close();
                } else {
                    // todo: is game board full
                    // Give the next player a turn
                    game.switchPlayer();
                    showBoard();
                    showCurrentPlayer();
                    playGame(rl);
                }
            } else {
                console.log('\n== Oh no! I don\'t understand, please try again. == \n');
                showDirections();
                showBoard();
                showCurrentPlayer();
                // Ask player again
                playGame(rl);
            }

        });
    }

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    }); 
       
    const beginGame = () => {
        // TODO: make it pretty with cowsay?  
        showSplash();
        
        // TODO: move board to constructor?
        playGame(rl);
    };
   
    beginGame();
}

gameInterface(game());

