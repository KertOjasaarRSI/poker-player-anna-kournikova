import combinations from './constants/combinations';
import { GameState } from './interfaces/GameState';
import detectHandRankings from "./HandDetector";

class Player {
  public call(betCallback: (bet: number) => void, gameState: GameState) {
    betCallback(gameState.current_buy_in - gameState.players[gameState.in_action].bet + gameState.minimum_raise);
  }

  public betRequest(gameState: GameState, betCallback: (bet: number) => void): void {
    const myPlayer = gameState.players.find(({ hole_cards }) => hole_cards);
    const cards = myPlayer.hole_cards;
    const cardsString = `${cards[0].rank}${cards[1].rank}`.toUpperCase();
    const communityCards = gameState.community_cards.map(({ rank }) => rank);

    const tolerance = combinations[cardsString];
    const playersLeft = gameState.players.length - gameState.players.filter(({ status }) => status === 'out').length;

    let decision = '';
    if (communityCards.length < 1) {
      if (tolerance) {
        if (playersLeft === 2 || tolerance === 100) {
          decision = 'ALL IN';
          betCallback(myPlayer.stack);
        } else {
          decision = 'CALL';
          this.call(betCallback, gameState);
        }
      } else {
        if (gameState.current_buy_in > 0) {
          decision = 'FOLD';
        } else {
          decision = 'CHECK';
        }
        betCallback(0);
      }
    } else {
      const handRank = detectHandRankings([...myPlayer.hole_cards, ...gameState.community_cards]);
      switch (handRank) {
        case 10:
          if (gameState.current_buy_in > 0) {
            decision = 'FOLD';
          } else {
            decision = 'CHECK';
          }
          betCallback(0);
          break;
        case 9:
          decision = 'CALL';
          this.call(betCallback, gameState);
          break;
        default:
          decision = 'ALL IN';
          betCallback(myPlayer.stack);
          break;
      }
    }
    console.log(`[AK] cards: ${cardsString}, communityCards: ${communityCards.join()}, ${decision}`, {
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
