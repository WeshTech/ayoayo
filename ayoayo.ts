import { GameLogic } from "./gamelogic";
import { Player } from "./player";

export class Ayoayo {
    private gameLogic: GameLogic;

    constructor(initialSeeds: number = 4) {
        this.gameLogic = new GameLogic(initialSeeds);
    }



    createPlayer(name: string): Player {
        return this.gameLogic.createPlayer(name);
    }


    printBoard(): void {
        this.gameLogic.validatePlayers();
        const player1 = this.gameLogic.getPlayer1();
        const player2 = this.gameLogic.getPlayer2();

        console.log("player1:");
        console.log(`store: ${player1.getStore()}`);
        console.log(player1.getPits());
        console.log("player2:");
        console.log(`store: ${player2.getStore()}`);
        console.log(player2.getPits());
    }



    returnWinner(): string {
        if (!this.gameLogic.getGameEnded()) {
            return "Game has not ended";
        }
        this.gameLogic.validatePlayers();
        const player1 = this.gameLogic.getPlayer1();
        const player2 = this.gameLogic.getPlayer2();
        const p1Score = player1.getStore();
        const p2Score = player2.getStore();

        if (p1Score > p2Score) {
            return `Winner is player 1: ${player1.getName()}`;
        } else if (p2Score > p1Score) {
            return `Winner is player 2: ${player2.getName()}`;
        } else {
            return "It's a tie";
        }
    }
    playGame(playerIndex: number, pitIndex: number): number[] {
        if (this.gameLogic.getGameEnded()) {
            console.log("Game is ended");
            return this.gameLogic.getBoardState();
        }
        this.gameLogic.validatePlayers();

        if (pitIndex <= 0 || pitIndex > 6) {
            console.log("Invalid number for pit index");
            return this.gameLogic.getBoardState();
        }



        const player = playerIndex === 1 ? this.gameLogic.getPlayer1() : this.gameLogic.getPlayer2();
        const opponent = playerIndex === 1 ? this.gameLogic.getPlayer2() : this.gameLogic.getPlayer1();

        let seeds = player.takeAllFromPit(pitIndex);
        if (seeds === 0) {
            console.log("Invalid move - selected pit is empty");
            player.setPit(pitIndex, 0);
            return this.gameLogic.getBoardState();
        }

        let extraTurn = this.gameLogic.sowSeeds(player, opponent, pitIndex, seeds);
        this.gameLogic.checkGameEnd();

        

        if (!this.gameLogic.getGameEnded() && extraTurn) {
            console.log(`player ${playerIndex} take another turn`);
        }

        return this.gameLogic.getBoardState();
    }
}