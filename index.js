const readline = require('readline');
const game = require('./game');

const interface = (game) => {
    let board = game.newBoard();

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
        console.log('||            %s   |    %s   |    %s              ||', row2[0], 'f', row2[2]);
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
        if (input == 'q' || input == 'Q')
            return { row:  0, column: 0 };
        else if(input == 'w' || input == 'W')
            return { row:  0, column: 1 };
        else if(input == 'e' || input == 'E')
            return { row:  0, column: 2 };
        else if(input == 'a' || input == 'A')
            return { row:  1, column: 0 };
        else if(input == 's' || input == 'S')
            return { row:  1, column: 1 };
        else if(input == 'd' || input == 'D')
            return { row:  1, column: 2 };
        else if(input == 'z' || input == 'Z')
            return { row:  2, column: 0 };
        else if(input == 'x' || input == 'X')
            return { row:  2, column: 1 };
        else if(input == 'c' || input == 'C')
            return { row:  2, column: 2};
        else 
            return {};
    };

    const promptPlayer = (rl) => {
        rl.question('Where would you like to place your token? (type key, then press enter) \n', (answer) => {
            let coords = mapKeysToCoords(answer);
            if (Object.keys(coords).length) {
                game.takeTurn(game.getCurrentPlayer, board, coords.row, coords.column)
                showBoard();
                game.switchPlayer();
            // display rules, keyboard interface and empty board
            } else {
                console.log('\n === Oh no! I don\'t understand, please try again. === \n');
                showDirections();
                showBoard();
                showCurrentPlayer();
                promptPlayer(rl);
            }

            // rl.close();
        });
    }

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    }); 
                
    // TODO: make it pretty with cowsay?  
    showSplash();
    showDirections();
    showBoard();
    showCurrentPlayer();

    // TODO: move board to constructor?
    promptPlayer(rl);

    
        // check win 
            // message user if won
        // switch player
            // message user if player switched
    
}

interface(game());

