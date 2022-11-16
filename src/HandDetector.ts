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
  const suitBased = groupBy(cards, "suite");

  const rankBasedCards: Card[][] = Object.values(rankBased);
  const suitBasedCards: Card[][] = Object.values(suitBased);

  let value = 10;
  if (rankBasedCards.some((rankBased) => rankBased.length === 4)) {
    // Four of a Kind
    value = 3;
  }
  else if (
    rankBasedCards.some((rankBased) => rankBased.length === 3) 
    && rankBasedCards.some((rankBased) => rankBased.length === 2)
  ) {
    // Full House
    value = 4;
  }
  // else if (
  //   suitBasedCards.some((suitBased) => suitBased.length === 5)
  // ) {
  //   // Flush
  //   value = 5
  // }
  else if (rankBasedCards.some((rankBased) => rankBased.length === 3)) {
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
