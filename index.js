const readline = require('readline');
const game = require('./game');

const playGame = (game) => {
    const playerX = 'X';
    const playerO = 'O';
    const currentPlayer = playerX;
    let board = game.newBoard();

    const showSplash = () => {
        console.clear();
        console.log('Let\'s play Tic Tac Toe! ');
        console.log('================================================= \n');
    };

    const showDirections = () => {
        console.log('Remember - get three in a row to win!');
        console.log('\n');
        console.log('=================================================');
        console.log('||   Use these keys to place your token:       ||'); 
        console.log('||                 |   |                       ||');        
        console.log('||               Q | W | E                     ||');            
        console.log('||              ___|___|___                    ||');                 
        console.log('||               A | S | D                     ||');             
        console.log('||              ___|___|___                    ||');                  
        console.log('||               Z | X | C                     ||');                      
        console.log('||                 |   |                       ||'); 
        console.log('================================================= \n');
        console.log('\n');   
    };

    const showBoard = (board) => {
        let row1 = board[0];
        let row2 = board[1];
        let row3 = board[2];
        console.log('       |        |           ');
        console.log('   %s   |    %s   |    %s     ', row1[0], row1[1], row1[2]);
        console.log('       |        |           ');
        console.log('---------------------------'); 
        console.log('       |        |           ');
        console.log('   %s   |    %s   |    %s     ', row2[0], row2[1], row2[2]);
        console.log('       |        |           ');
        console.log('---------------------------');
        console.log('       |        |           ');
        console.log('   %s   |    %s   |    %s     ', row3[0], row3[1], row3[2]);
        console.log('       |        |           ');
    };

    const showCurrentPlayer = (currentPlayer) => {
        console.log('Player %s - it is your turn!', currentPlayer);
    };

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    
                
    // PLAYER [], place your token!

    


      // TODO: cowsay?
      // display rules, keyboard interface and empty board
      // state which player is currently playing
      // prompt user for input
         
      showSplash();
      showDirections();
      showBoard(board);
      showCurrentPlayer(currentPlayer);

      rl.question('Where would you like to place your token? ', (answer) => {
        console.log(`I placed: ${currentPlayer} at ${answer}`);

        // if keyboard input not the right keys ask again
        // takeTurn(token, board, row, column) 
        // display rules, keyboard interface and empty board
        rl.close();
    });

    
        
            // message user if user can't play token
        // check win 
            // message user if won
        // switch player
            // message user if player switched
    
}

playGame(game());

