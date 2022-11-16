interface Card {
  rank:
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9"
    | "10"
    | "J"
    | "Q"
    | "K"
    | "A";
  suite: "hearts" | "spades" | "clubs" | "diamonds";
}

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

  console.log("[AK] Hand detection", { cards, value });
  return value;
}