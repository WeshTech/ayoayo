export class Player {
    private name: string;
    private store: number;
    private pits: number[];

    constructor(name: string, initialSeeds: number = 4) {
        this.name = name;
        this.store = 0;
        this.pits = Array(6).fill(initialSeeds);
    }


    getName(): string {
        return this.name;
    }

    getStore(): number {
        return this.store;
    }


    getPits(): number[] {
        return [...this.pits];
    }


    addToStore(seeds: number): void {
        this.store += seeds;
    }


    getPit(index: number): number {
        if (index < 1 || index > 6) throw new Error("Umeuma nje mbaya!");
        return this.pits[index - 1];
    }


    setPit(index: number, value: number): void {
        if (index < 1 || index > 6) throw new Error("Umeuma nje mbaya!");
        this.pits[index - 1] = value;
    }


    takeAllFromPit(index: number): number {
        if (index < 1 || index > 6) throw new Error("Umeuma nje mbaya!");
        const seeds = this.pits[index - 1];
        this.pits[index - 1] = 0;
        return seeds;
    }


    hasEmptyPits(): boolean {
        return this.pits.every(pit => pit === 0);
    }
    

    captureRemainingSeeds(): number {
        let total = 0;
        for (let i = 0; i < 6; i++) {
            total += this.pits[i];
            this.pits[i] = 0;
        }
        return total;
    }
}