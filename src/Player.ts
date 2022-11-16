import combinations from './constants/combinations';
import { GameState } from './interfaces/GameState';

class Player {
  public betRequest(gameState: GameState, betCallback: (bet: number) => void): void {
    const myPlayer = gameState.players.find(({ hole_cards }) => hole_cards);
    const cards = myPlayer.hole_cards;
    const cardsString = `${cards[0].rank}${cards[1].rank}`.toUpperCase();

    const tolerance = combinations[cardsString];
    const playersLeft = gameState.players.length - gameState.players.filter(({ status }) => status === 'out').length;

    if (tolerance) {
      if (playersLeft === 2 || tolerance === 100) {
        console.log(`[AK] cards: ${cardsString}, ALL IN`, { playersLeft, tolerance });
        betCallback(myPlayer.stack);
      } else {
        console.log(`[AK] cards: ${cardsString}, call`);
        betCallback(gameState.current_buy_in - gameState.players[gameState.in_action].bet + gameState.minimum_raise);
      }
    } else {
      console.log(`[AK] cards: ${cardsString}, check/fold`);
      betCallback(0);
    }
  }

  public showdown(gameState: any): void {

  }
};

export default Player;
