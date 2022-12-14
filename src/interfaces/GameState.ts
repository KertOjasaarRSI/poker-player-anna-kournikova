export interface GameState {
    tournament_id: string;
    game_id: string;
    round: number;
    bet_index: number;
    small_blind: number;
    current_buy_in: number;
    pot: number;
    minimum_raise: number;
    dealer: number;
    orbits: number;
    in_action: number;
    players: Player[];
    community_cards: Card[];
}

export interface Card {
    rank:
        | "2"
        | "3"
        | "4"
        | "5"
        | "6"
        | "7"
        | "8"
        | "9"
        | "10"
        | "J"
        | "Q"
        | "K"
        | "A";
    suit: "hearts" | "spades" | "clubs" | "diamonds";
}

export interface Player {
    id: number;
    name: string;
    status: string;
    version: string;
    stack: number;
    bet: number;
    hole_cards?: Card[];
    amount_won?: number;
}
