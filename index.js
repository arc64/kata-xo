const readline = require('readline');
const cowsay = require("cowsay");
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

    const speakToUser = (message) => {
        let msg = '\n Oh no, something went wrong \n';
        if(message) msg = message;

        console.log(cowsay.say({
            text : msg,
            e : "oO",
            T : "U "
        }));
    };

    const showSplash = () => {
        console.clear();
        console.log('\n     Let\'s play Tic Tac Toe!    ');
        console.log('================================================= \n');
    };

    const showDirections = () => {
        console.log('     Remember to get three in a row to win!');
        console.log('=================================================');
        console.log('||   Use these keys to place your token:       ||'); 
        console.log('||                  |   |                      ||');        
        console.log('||                Q | W | E                    ||');            
        console.log('||               ___|___|___                   ||');                 
        console.log('||                A | S | D                    ||');             
        console.log('||               ___|___|___                   ||');                  
        console.log('||                Z | X | C                    ||');                      
        console.log('||                  |   |                      ||');  
    };

    const showBoard = () => {
        let row1 = board[0];
        let row2 = board[1];
        let row3 = board[2];
        console.log('=================================================');
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

    const mapKeysToCoords = (input) => {
        const result = inputKeyMap[input.toLowerCase()];
        if(result) 
            return result;
        return {};
    };

    const displayGameState = (msg) => {
        console.clear();
        showSplash();
        showDirections();
        showBoard();
        speakToUser(msg);
    };

    const askQuestion = (rl) => {
        rl.question('\nWhere would you like to place your token? (type key, then press enter) \n', (answer) => {
            let coords = mapKeysToCoords(answer);
         
            // Did use use a key we understand?
            if (Object.keys(coords).length) {
                if(game.takeTurn(game.getCurrentPlayer(), board, coords.row, coords.column)) {
                    // check if they won
                    if (game.hasWinCondition(board)) {
                        displayGameState('\n Player ' + game.getCurrentPlayer() + ' - YOU WON! \n');
                        rl.close();
                    } else if (game.boardIsFull(board)) {
                        // If board is full
                        displayGameState('\n The game is a DRAW! \n');
                        rl.close();
                    } else {
                        // Give the next player a turn
                        game.switchPlayer();
                        displayGameState('\n  Player ' + game.getCurrentPlayer() + ' - it is your turn! \n');
                        askQuestion(rl); 
                    }
                } else {
                    // Position taken
                    displayGameState('\n  Player ' + game.getCurrentPlayer() + ' this position is taken, please pick a empty space!  \n');
                    askQuestion(rl); 
                }
            } else {
                // Ask player again
                displayGameState('\n Oh no! Player ' + game.getCurrentPlayer() + '! I don\'t understand, please try again.  \n');
                askQuestion(rl); 
            }
            
        });
    }
       
    const beginGame = () => {
        // TODO: move board into the game where it should be, and stop passing it
        
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        }); 
        
        displayGameState('\n  Player ' + game.getCurrentPlayer() + ' - it is your turn! \n');
        askQuestion(rl);   
    };
   
    beginGame();
}

gameInterface(game());

