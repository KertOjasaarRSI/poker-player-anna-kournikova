class Player {
  static get VERSION() {
    return '0.1';
  }

  static betRequest(gameState, bet) {
    console.debug('betRequest - gameState', gameState);
    console.debug('betRequest - bet', bet);
    bet(1000);
  }

  static showdown(gameState) {
    console.debug('showdown - gameState', gameState);
  }
}

module.exports = Player;
