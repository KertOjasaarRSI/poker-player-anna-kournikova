const combinations = require('./constants/combinations')

class Player {
  static get VERSION() {
    return '0.5';
  }

  static betRequest(gameState, bet) {

    gameState.minimum_raise = undefined;
    const cards = gameState.players.find(({ hole_cards }) => hole_cards).hole_cards;
    const cardsString = `${cards[0].rank}${cards[1].rank}`.toUpperCase();

    if (combinations[cardsString]) {
      console.log(`[AK] cards: ${cardsString}, call`);
      bet(gameState.current_buy_in - gameState.players[gameState.in_action].bet + gameState.minimum_raise);
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
