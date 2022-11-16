import handTolerances from "./constants/handTolerances";
import { Card } from "./interfaces/GameState";

class Risk {
    private handTolerances = handTolerances;

    private sortedHand(cards: Card[], key: keyof Card): Card[] {
        return cards.sort((a, b) => {
            const valueA = a[key];
            const valueB = b[key];

            if (valueA < valueB) {
                return -1;
            }
            if (valueA > valueB) {
                return 1
            }
            return 0
        });
    }

    private sortedHandByRank(cards: Card[]): string {
        const hand = this.sortedHand(cards, 'rank');

        return hand.map(({ rank }) => rank).join('');
    }

    public getHandTolerance(cards: Card[]): number {
        const playerHand = this.sortedHandByRank(cards);

        return this.handTolerances[playerHand];
    }
}

export default Risk;