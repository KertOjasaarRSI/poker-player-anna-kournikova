class Player {
  static get VERSION() {
    return '0.4';
  }

  static betRequest(gameState, bet) {
    const combinations = {
      'AA': 3,
      'KK': 3,
      'QQ': 3,
      'JJ': 3,
      'TT': 3,
      '99': 3,
      '88': 3,
      '77': 3,
      '66': 3,
      '55': 3,
      '44': 3,
      '33': 3,
      '22': 3,

      'KA': 3,
      'AK': 3,
      'AQ': 3,
      'QA': 3,
      'AJ': 3,
      'JA': 3,
      'A10': 3,
      '10A': 3,
      'A9': 3,
      '9A': 3,
      'A8': 3,
      '8A': 3,
      'A7': 3,
      '7A': 3,
      'A6': 3,
      '6A': 3,
      'A5': 3,
      '5A': 3,
      'A4': 3,
      '4A': 3,
      'A3': 3,
      '3A': 3,
      'A2': 3,
      '2A': 3,
    };

    const cards = gameState.players.find(({ hole_cards }) => hole_cards).hole_cards;
    const cardsString = `${cards[0].rank}${cards[1].rank}`.toUpperCase();

    if (combinations[cardsString]) {
      console.log(`cards: ${cardsString}, ALL IN`);
      bet(1000);
    } else {
      console.log(`cards: ${cardsString}, check/call/fold`);
      bet(0);
    }
  }

  static showdown(gameState) {
  }
}

module.exports = Player;
