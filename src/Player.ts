import combinations from './constants/combinations';

class Player {
  public betRequest(gameState: any, betCallback: (bet: number) => void): void {
    const cards = gameState.players.find(({ hole_cards }) => hole_cards).hole_cards;
    const cardsString = `${cards[0].rank}${cards[1].rank}`.toUpperCase();

    if (combinations[cardsString]) {
      console.log(`[AK] cards: ${cardsString}, call`);
      betCallback(gameState.current_buy_in - gameState.players[gameState.in_action].bet + gameState.minimum_raise);
    } else {
      console.log(`[AK] cards: ${cardsString}, check/call/fold`);
      betCallback(0);
    }
  }

  public showdown(gameState: any): void {

  }
};

export default Player;
