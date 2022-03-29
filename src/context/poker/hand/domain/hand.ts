import { Card } from '../../card/domain/card';
import { HandRank } from './handRank';
import { InvalidHandCardCountError } from './invalidHandCardCountError';
import { RepeatedCardError } from './repeatedCardError';

type CardSequence = { [value: string]: Card[] };
type CardSequenceArray = [string, Card[]][];

const HandCardCount = 5;

export class Hand {
  readonly rank: HandRank;
  readonly cards: Card[];

  constructor(cardArray: Card[]) {
    const cards = [...cardArray];
    this.ensureCardHandSize(cards);
    this.ensureNoRepeatedCard(cards);
    const sequences = this.checkSequences(cards);
    this.cards = this.ensureCardOrder(sequences);
    this.rank = this.processHandRank(sequences);
  }

  static fromCardNotationArray(serializedCards: string[]): Hand {
    const cards: Card[] = [];
    for (let card of serializedCards) {
      cards.push(Card.createFromNotation(card));
    }
    return new Hand(cards);
  }

  static getKickers(hand: Hand): Card[] {
    if (hand.rank !== HandRank.StraightFlush && hand.rank !== HandRank.Straight) return [...hand.cards];
    if (hand.cards[0].value === 'A' && hand.cards[1].value === '5') return [hand.cards[1]];
    return [hand.cards[0]];
  }

  orderByCardValueAsc(cards: Card[]): void {
    cards.sort((c1, c2) => c1.compare(c2));
  }

  private ensureCardHandSize(cards: Card[]): void {
    if (cards.length < HandCardCount || cards.length > HandCardCount) throw new InvalidHandCardCountError(cards.length);
  }

  private ensureNoRepeatedCard(cards: Card[]): void {
    for (let i = 0; i < cards.length - 1; i++) {
      for (let j = i + 1; j < cards.length; j++) {
        if (cards[i].equals(cards[j])) throw new RepeatedCardError(cards[i].toString());
      }
    }
  }

  private ensureCardOrder(sequences: CardSequenceArray): Card[] {
    const orderedCards: Card[] = [];
    for (let sequence of Object.values(sequences)) {
      orderedCards.push(...sequence[1]);
    }
    return orderedCards;
  }

  private processHandRank(sequences: CardSequenceArray): HandRank {
    const sameSuit = this.checkSameSuit(this.cards);
    const straight = this.checkStraight(this.cards);
    if (sameSuit && straight) return HandRank.StraightFlush;
    if (sameSuit) return HandRank.Flush;
    if (straight) return HandRank.Straight;
    return this.processSequences(sequences);
  }

  private processSequences(sequences: CardSequenceArray): HandRank {
    const firstSequenceLength = sequences[0][1].length;
    const secondSequenceLength = sequences[1][1].length;

    if (firstSequenceLength === 4) return HandRank.FourOfAKind;
    if (firstSequenceLength === 3 && secondSequenceLength === 2) return HandRank.FullHouse;
    if (firstSequenceLength === 3) return HandRank.ThreeOfAKind;
    if (firstSequenceLength === 2 && secondSequenceLength === 2) return HandRank.TwoPair;
    if (firstSequenceLength === 2) return HandRank.OnePair;
    return HandRank.HighCard;
  }

  private checkSequences(cards: Card[]): CardSequenceArray {
    const sequences = this.getSequences(cards);

    let cardByFrequencyArray = Object.entries(sequences).sort((a, b) => {
      if (a[1].length < b[1].length) return 1;
      if (a[1].length > b[1].length) return -1;
      return b[1][0].compare(a[1][0]);
    }) as CardSequenceArray; // for hand "['Ah', '9c', '9s', '9d', 'Ac']" returns [ [ '9', [ [Card], [Card], [Card] ] ], [ 'A', [ [Card], [Card] ] ] ]
    return cardByFrequencyArray;
  }

  private getSequences(cards: Card[]): CardSequence {
    return cards.reduce((obj, card) => {
      if (!obj[card.value]) obj[card.value] = [];
      obj[card.value].push(card);
      return obj;
    }, Object.create(null)) as CardSequence;
  }

  private checkSameSuit(cards: Card[]): boolean {
    const firstCard = cards[0];
    const count = cards.filter(card => card.hasSameSuit(firstCard)).length;
    return count === cards.length;
  }

  private checkStraight(cardsArray: Card[]): boolean {
    const cards = [...cardsArray];
    this.orderByCardValueAsc(cards);

    let card = cards[0];
    for (let i = 1; i < cards.length; i++) {
      let nextCard = cards[i];
      let nextCardValueIndex = card.valueIndex + 1;
      if (i === 4 && card.value === '5' && nextCard.value === 'A') return true; //As to 5 straight
      if (nextCard.valueIndex !== nextCardValueIndex) return false;
      card = nextCard;
    }
    return true;
  }

  compare(other: Hand): number {
    if (this.rank < other.rank) return -1;
    if (this.rank > other.rank) return 1;
    const handKickers = Hand.getKickers(this);
    const otherKickers = Hand.getKickers(other);
    for (let i = 0; i < handKickers.length; i++) {
      let compareResult = handKickers[i].compare(otherKickers[i]);
      if (compareResult !== 0) return compareResult;
    }
    return 0;
  }
}
