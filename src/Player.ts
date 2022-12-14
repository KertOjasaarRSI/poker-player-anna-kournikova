import combinations from './constants/combinations';
import { GameState } from './interfaces/GameState';
import detectHandRankings from "./HandDetector";

class Player {
  public call(betCallback: (bet: number) => void, gameState: GameState) {
    betCallback(gameState.current_buy_in);
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
          if (gameState.current_buy_in < gameState.small_blind * 2 * 5) {
            decision = 'CALL';
            this.call(betCallback, gameState);
          } else {
            if (gameState.current_buy_in > 0) {
              decision = 'FOLD';
            } else {
              decision = 'CHECK';
            }
            betCallback(0);
          }
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
      let handRank = detectHandRankings([...myPlayer.hole_cards, ...gameState.community_cards]);
      const tableRank = detectHandRankings([...gameState.community_cards]);

      if (handRank === 9 && tableRank === 9) {
        handRank = 10;
      } else if (handRank === 8 && tableRank === 9) {
        handRank = 9;
      }

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
        case 8:
          if (
              handRank === 8
              || (handRank === 9 && gameState.current_buy_in < gameState.small_blind * 2 * 10)
          ) {
            decision = 'CALL';
            this.call(betCallback, gameState);
          } else {
            if (gameState.current_buy_in > 0) {
              decision = 'FOLD';
            } else {
              decision = 'CHECK';
            }
            betCallback(0);
          }
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
      amount: gameState.current_buy_in,
      stack: myPlayer.stack,
      playersLeft,
      tolerance,
      handDetector: detectHandRankings([...myPlayer.hole_cards, ...gameState.community_cards])
    });
  }

  public showdown(gameState: GameState): void {
    try {
      function formatCard({rank, suit}) {
        return `${rank}${suit[0].toUpperCase()}`;
      };

      const akProfile = gameState.players.find(({id}) => id === 2);
      console.log('[AK][Showdown]', {
        gameId: gameState.game_id,
        hand: akProfile.hole_cards.map((card) => formatCard(card)),
        status: akProfile.status,
        amountWon: akProfile.amount_won,
        community: gameState.community_cards.map((card) => formatCard(card)),
        opponenets: gameState.players.filter(({id, hole_cards}) => id !== 2 && hole_cards).map(({hole_cards, status, amount_won}) => ({amountWon: amount_won, status, hand: JSON.stringify(hole_cards.map((card) => formatCard(card)))})),
      });
    } catch {
      console.log(gameState);
    }
  }
};

export default Player;
