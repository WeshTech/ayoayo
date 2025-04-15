import { Ayoayo } from './ayoayo';

function runAutomatedGame() {
    const game = new Ayoayo();
    const player1 = game.createPlayer("Yobra");
    const player2 = game.createPlayer("Jovila");

    console.log(game.playGame(1, 3));  

    //sample gaming I have implemented!!!
    game.playGame(1, 1);               
    game.playGame(2, 3);               
    game.playGame(2, 4);               
    game.playGame(1, 2);               
    game.playGame(2, 2);               
    game.playGame(1, 1);               

    game.printBoard();
    console.log(game.returnWinner());
}

runAutomatedGame();