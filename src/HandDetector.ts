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
  const suitBased = groupBy(cards, "suit");

  const rankBasedCards: Card[][] = Object.values(rankBased);
  const suitBasedCards: Card[][] = Object.values(suitBased);
  const isFlush = suitBasedCards.some((x) => x.length === 5);
  const isCloseToFlush = suitBasedCards.some((x) => x.length === 4) && cards.length < 7;

  const numericRankKeysSorted = Object.keys(rankBased).map((rank) => {
    if (rank === 'J') return 11;
    if (rank === 'Q') return 12;
    if (rank === 'K') return 12;
    if (rank === 'A') return 14;
    return Number(rank);
  }).sort((a, b) => a - b);
  
  const numericRankString = numericRankKeysSorted.join('');
  
  const isLowStraight = numericRankKeysSorted[numericRankKeysSorted.length - 1] === 14 
    && numericRankString.includes('2345');
  
  const isTopStraight = numericRankString.includes('1011121314');
  
  const isStraight = numericRankKeysSorted.length > 4 && 
  (isLowStraight 
   || numericRankString.includes('23456')
   || numericRankString.includes('34567') 
   || numericRankString.includes('45678')
   || numericRankString.includes('56789')
   || numericRankString.includes('678910')
   || numericRankString.includes('7891011')
   || numericRankString.includes('89101112')
   || numericRankString.includes('910111213')
   || numericRankString.includes('910111213')
   || isTopStraight
  );
  
  const isRoyalFlush = isTopStraight && isFlush;
  const isStraightFlush = isStraight && isFlush;

  let value = 10;
  if (isRoyalFlush) {
    // Royal flush
    value = 1
  }
  else if (isStraightFlush) {
    // Straight flush
    value = 2;
  }
  if (rankBasedCards.some((x) => x.length === 4)) {
    // Four of a Kind
    value = 3;
  }
  else if (
    rankBasedCards.some((x) => x.length === 3) 
    && rankBasedCards.some((x) => x.length === 2)
  ) {
    // Full House
    value = 4;
  }
  else if (isFlush) {
    // Flush
    value = 5
  }
  else if (isStraight) {
    // Straight
    value = 6;
  }
  else if (rankBasedCards.some((x) => x.length === 3)) {
    // Three of a kind
    value = 7;
  } else if (
    rankBasedCards.filter((x) => x.length === 2).length === 2
    ) {
      // Two pairs
    value = 8;
  } else if (rankBasedCards.some((x) => x.length === 2) || isCloseToFlush) {
    // Pair or close to flush
    value = 9;
  } else {
    // High card
    value = 10;
  }

  return value;
}

export default detectHandRankings;
