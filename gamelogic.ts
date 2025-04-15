import { Player } from './player';

export class GameLogic {
    private player1: Player | null = null;
    private player2: Player | null = null;
    private currentPlayer: Player | null = null;
    private gameEnded: boolean = false;
    private initialSeeds: number;

    constructor(initialSeeds: number = 4) {
        this.initialSeeds = initialSeeds;
    }

    createPlayer(name: string): Player {
        if (!this.player1) {
            this.player1 = new Player(name, this.initialSeeds);
            return this.player1;
        }
        if (!this.player2) {
            this.player2 = new Player(name, this.initialSeeds);
            return this.player2;
        }
        throw new Error("Both players already created");
    }

    getBoardState(): number[] {
        if (!this.player1 || !this.player2) {
            throw new Error("Players not initialized");
        }
        return [
            ...this.player1.getPits(),
            this.player1.getStore(),
            ...this.player2.getPits(),
            this.player2.getStore()
        ];
    }

    sowSeeds(player: Player, opponent: Player, startPit: number, seeds: number): boolean {
        let currentPit = startPit + 1;
        let currentPlayer = player;
        let lastPitPlayer: Player = player;
        let lastPitIndex = 0;
        while (seeds > 0) {
            if (currentPlayer === player && currentPit > 6) {
                player.addToStore(1);
                seeds--;
                lastPitPlayer = player;
                lastPitIndex = -1;
                if (seeds === 0) {
                    return true;
                }
                currentPit = 1;
                currentPlayer = opponent;
            } else if (currentPlayer === opponent && currentPit > 6) {
                currentPit = 1;
                currentPlayer = player;
            } else {
                if (currentPlayer === player) {
                    player.setPit(currentPit, player.getPit(currentPit) + 1);
                } else {
                    opponent.setPit(currentPit, opponent.getPit(currentPit) + 1);
                }
                lastPitPlayer = currentPlayer;
                lastPitIndex = currentPit;

                seeds--;
                currentPit++;
            }
        }

        if (lastPitPlayer === player && lastPitIndex !== -1) {
            const lastPitSeeds = player.getPit(lastPitIndex);
            if (lastPitSeeds === 1) {
                const oppositePitIndex = 7 - lastPitIndex;
                const capturedSeeds = opponent.takeAllFromPit(oppositePitIndex);

                if (capturedSeeds > 0) {
                    player.addToStore(capturedSeeds + 1);
                    player.setPit(lastPitIndex, 0);
                }
            }
        }

        return false;
    }

    checkGameEnd(): void {
        if (!this.player1 || !this.player2) {
            throw new Error("Players not initialized");
        }
        if (this.player1.hasEmptyPits() || this.player2.hasEmptyPits()) {
            this.gameEnded = true;
            this.player1.addToStore(this.player1.captureRemainingSeeds());
            this.player2.addToStore(this.player2.captureRemainingSeeds());
        }
    }

    getGameEnded(): boolean {
        return this.gameEnded;
    }



    getPlayer1(): Player {
        if (!this.player1) throw new Error("Player 1 not initialized");
        return this.player1;
    }



    getPlayer2(): Player {
        if (!this.player2) throw new Error("Player 2 not initialized");
        return this.player2;
    }

    

    validatePlayers(): void {
        if (!this.player1 || !this.player2) {
            throw new Error("Both players must be initialized");
        }
    }
}