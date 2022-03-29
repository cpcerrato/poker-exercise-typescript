import { Card } from '../../../../../src/Context/Poker/Card/Domain/Card';
import { Hand } from '../../../../../src/Context/Poker/Hand/Domain/Hand';
import { HandRank } from '../../../../../src/Context/Poker/Hand/Domain/HandRank';
import { InvalidHandCardCountError } from '../../../../../src/Context/Poker/Hand/Domain/InvalidHandCardCountError';
import { RepeatedCardError } from '../../../../../src/Context/Poker/Hand/Domain/RepeatedCardError';

describe('Test Hand domain entity', () => {
  const handTypesTestArray: [string[], HandRank][] = [
    [['Tc', 'Kc', 'Ac', 'Jc', 'Qc'], HandRank.StraightFlush],
    [['Tc', '8c', '9c', '7c', 'Jc'], HandRank.StraightFlush],
    [['Ac', 'Ah', 'Ad', 'As', 'Qc'], HandRank.FourOfAKind],
    [['Jc', 'Ac', 'Ah', 'Ad', 'As'], HandRank.FourOfAKind],
    [['Ac', '3h', 'Ah', '3d', '3c'], HandRank.FullHouse],
    [['3s', 'Ks', 'As', '2s', 'Qs'], HandRank.Flush],
    [['4h', '6h', '5h', '7h', 'Ah'], HandRank.Flush],
    [['Ts', 'Kc', 'Ad', 'Jc', 'Qc'], HandRank.Straight],
    [['5s', '2c', 'Ad', '3c', '4s'], HandRank.Straight],
    [['5s', '2c', '6d', '3c', '4s'], HandRank.Straight],
    [['Ac', '3h', '2h', '3d', '3c'], HandRank.ThreeOfAKind],
    [['Ac', '3h', 'Ah', '3d', '7c'], HandRank.TwoPair],
    [['9c', '3h', 'Ah', '3d', '7c'], HandRank.OnePair],
    [['7s', '3h', 'Ah', '5d', '7c'], HandRank.OnePair],
    [['3s', 'Kc', 'Ad', '2c', 'Qc'], HandRank.HighCard],
    [['4s', '6c', '5c', '7c', 'Ad'], HandRank.HighCard]
  ];

  const compareHandsArray: [HandRank, HandRank, string[], string[], number][] = [
    [HandRank.HighCard, HandRank.OnePair, ['9c', '3h', 'Ah', '5d', '7c'], ['7s', '2d', '5h', '5c', '9h'], -1],
    [HandRank.FullHouse, HandRank.Straight, ['Ac', 'Ah', 'Ad', 'Qs', 'Qc'], ['5s', '2c', 'As', '3c', '4s'], 1],
    [HandRank.StraightFlush, HandRank.Straight, ['5c', '2c', '6c', '3c', '4c'], ['5s', '2h', 'As', '3d', '4h'], 1]
  ];

  const tieBreakerHandsTestArray: [HandRank, string[], string[], number][] = [
    [HandRank.StraightFlush, ['Tc', 'Kc', 'Ac', 'Jc', 'Qc'], ['4s', '7s', '5s', '8s', '6s'], 1],
    [HandRank.StraightFlush, ['Tc', 'Kc', 'Ac', 'Jc', 'Qc'], ['Ts', 'Ks', 'As', 'Js', 'Qs'], 0],
    [HandRank.FourOfAKind, ['Jc', 'Jh', 'Jd', 'Js', 'Qc'], ['Qc', 'Qh', 'Qd', 'Qs', 'Ah'], -1],
    [HandRank.FullHouse, ['Ac', 'Ah', 'Ad', 'Qs', 'Qc'], ['Jc', 'Jh', 'Jd', 'Qd', 'Qh'], 1],
    [HandRank.Flush, ['2c', '5c', '8c', '6c', 'Ac'], ['Jc', '3c', '7c', '4c', 'Tc'], 1],
    [HandRank.Straight, ['5c', '2s', '6s', '3c', '4d'], ['5s', '2c', 'As', '3d', '4c'], 1],
    [HandRank.Straight, ['Ac', 'Ts', 'Js', 'Kc', 'Qd'], ['5s', '2c', 'As', '3d', '4c'], 1],
    [HandRank.TwoPair, ['Ac', 'Jc', 'Ad', 'Js', '8c'], ['Qc', '7c', 'Qd', '7s', '3c'], 1],
    [HandRank.TwoPair, ['Ac', 'Jc', 'Ad', 'Js', '8c'], ['As', 'Kd', 'Kc', 'Ah', '3c'], -1],
    [HandRank.TwoPair, ['Ac', 'Jc', 'Ad', 'Js', '8c'], ['As', 'Jh', 'Ah', 'Jd', '3c'], 1],
    [HandRank.OnePair, ['3c', 'Jc', '2d', 'Js', 'Kc'], ['4s', 'Kh', '7h', 'Kd', 'Qc'], -1],
    [HandRank.OnePair, ['3c', 'Jc', '2d', 'Js', 'Kc'], ['4s', 'Jh', '7h', 'Jd', 'Qc'], 1],
    [HandRank.HighCard, ['9c', '3h', 'Ah', '5d', '7c'], ['9s', '3d', 'Qh', '5c', '7h'], 1],
    [HandRank.HighCard, ['9c', '3h', 'Jh', '5d', '7c'], ['9s', '3d', 'Kh', '5c', '7h'], -1],
    [HandRank.HighCard, ['9c', '3h', 'Ah', '5d', '7c'], ['9s', '3d', 'As', '5c', '7h'], 0]
  ];

  test('Constructor should throw an InvalidHandCardCountError if cards.count < 5', () => {
    const cards: Card[] = [];
    expect(() => new Hand(cards)).toThrow(InvalidHandCardCountError);
  });

  test('Constructor should throw an RepeatedCardError if there is a duplicated card', () => {
    const cards: Card[] = [];
    for (let i = 2; i < 6; i++) {
      cards.push(Card.createFromNotation(`${i}c`));
    }
    const randomRepeatedValue = Math.floor(Math.random() * (5 - 2 + 1) + 2);
    cards.push(Card.createFromNotation(`${randomRepeatedValue}c`));

    expect(() => new Hand(cards)).toThrow(RepeatedCardError);
  });

  test('Constructor should store hand sorted by value', () => {
    const c1 = Card.createFromNotation('Ah');
    const c2 = Card.createFromNotation('3c');
    const c3 = Card.createFromNotation('9s');
    const c4 = Card.createFromNotation('2d');
    const c5 = Card.createFromNotation('7d');
    const cards = [c1, c2, c3, c4, c5];
    const orderedCards = [c1, c3, c5, c2, c4];
    const hand = new Hand(cards);
    expect(hand.cards).toEqual(orderedCards);
  });

  test('fromCardNotationArray should return new hand object', () => {
    const c1 = Card.createFromNotation('Ah');
    const c2 = Card.createFromNotation('3c');
    const c3 = Card.createFromNotation('9s');
    const c4 = Card.createFromNotation('2d');
    const c5 = Card.createFromNotation('7d');
    const cards = [c1, c2, c3, c4, c5];
    const cardArray = ['Ah', '3c', '9s', '2d', '7d'];
    const handFromCards = new Hand(cards);
    const handFromNotation = Hand.fromCardNotationArray(cardArray);

    expect(handFromCards).toEqual(handFromNotation);
  });

  test.each(handTypesTestArray)('Given hand %p, returns %p', (cards, handRank) => {
    const hand = Hand.fromCardNotationArray(cards);
    expect(hand.rank).toBe(handRank);
  });

  test.each(compareHandsArray)(
    'Given hands with ranks %p and %p (%p, %p), returns %p',
    (handRank1, handRank2, cardsHand1, cardsHand2, expected) => {
      const hand1 = Hand.fromCardNotationArray(cardsHand1);
      const hand2 = Hand.fromCardNotationArray(cardsHand2);
      if (hand1.rank !== handRank1 || hand2.rank !== handRank2) throw new Error('Invalid hand rank');
      expect(hand1.compare(hand2)).toBe(expected);
    }
  );

  test.each(tieBreakerHandsTestArray)(
    'Given two hands with same rank %p, %p and %p, returns %p',
    (handRank, cardsHand1, cardsHand2, expected) => {
      const hand1 = Hand.fromCardNotationArray(cardsHand1);
      const hand2 = Hand.fromCardNotationArray(cardsHand2);
      if (hand1.rank !== handRank || hand2.rank !== handRank) throw new Error('Invalid hand rank');
      expect(hand1.compare(hand2)).toBe(expected);
    }
  );
});
