import {Card} from "./interfaces/GameState";

function detectHandRankings(cards: Card[]) {
  const groupBy = (array: Card[], key: string) => {
    return array.reduce((result, currentValue) => {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      return result;
    }, {});
  };

  const rankBased = groupBy(cards, "rank");

  const rankBasedCards: Card[][] = Object.values(rankBased);
  let value = 10;
  if (rankBasedCards.some((rankBased) => rankBased.length === 3)) {
    // Three of a kind
    value = 7;
  } else if (
    rankBasedCards.filter((rankBased) => rankBased.length === 2).length === 2
    ) {
      // Two pairs
    value = 8;
  } else if (rankBasedCards.some((rankBased) => rankBased.length === 2)) {
    // Pair
    value = 9;
  } else {
    // High card
    value = 10;
  }

  return value;
}

export default detectHandRankings;
