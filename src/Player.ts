import combinations from './constants/combinations';
import { GameState } from './interfaces/GameState';
import detectHandRankings from "./HandDetector";

class Player {
  public betRequest(gameState: GameState, betCallback: (bet: number) => void): void {
    const myPlayer = gameState.players.find(({ hole_cards }) => hole_cards);
    const cards = myPlayer.hole_cards;
    const cardsString = `${cards[0].rank}${cards[1].rank}`.toUpperCase();
    const communityCards = gameState.community_cards.map(({ rank }) => rank).join();

    const tolerance = combinations[cardsString];
    const playersLeft = gameState.players.length - gameState.players.filter(({ status }) => status === 'out').length;

    let decision = '';
    if (tolerance) {
      if (playersLeft === 2 || tolerance === 100) {
        decision = 'ALL IN';
        betCallback(myPlayer.stack);
      } else {
        decision = 'CALL';
        betCallback(gameState.current_buy_in - gameState.players[gameState.in_action].bet + gameState.minimum_raise);
      }
    } else {
      if (gameState.current_buy_in > 0) {
        decision = 'FOLD';
      } else {
        decision = 'CHECK';
      }
      betCallback(0);
    }
    console.log(`[AK] cards: ${cardsString}, communityCards: ${communityCards}, ${decision}`, {
      gameId: gameState.game_id,
      round: gameState.round,
      amount: gameState.current_buy_in - gameState.players[gameState.in_action].bet + gameState.minimum_raise,
      stack: myPlayer.stack,
      playersLeft,
      tolerance,
      handDetector: detectHandRankings([...myPlayer.hole_cards, ...gameState.community_cards])
    });
  }

  public showdown(gameState: GameState): void {
    console.log()
  }
};

export default Player;
