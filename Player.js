const combinations = require('./constants/combinations')

class Player {
  static get VERSION() {
    return '0.5';
  }

  static betRequest(gameState, bet) {

    const cards = gameState.players.find(({ hole_cards }) => hole_cards).hole_cards;
    const cardsString = `${cards[0].rank}${cards[1].rank}`.toUpperCase();

    if (combinations[cardsString]) {
      console.log(`[AK] cards: ${cardsString}, call`);
      bet(1000);
    } else {
      console.log(`[AK] cards: ${cardsString}, check/call/fold`);
      bet(0);
    }
  }

  static showdown(gameState) {
  }

  /**
   * response type
   * {
   *
   * }
   */
}

module.exports = Player;
