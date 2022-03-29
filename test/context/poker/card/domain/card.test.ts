import { Card } from '../../../../../src/Context/Poker/Card/Domain/Card';
import { CardValue } from '../../../../../src/Context/Poker/Card/Domain/CardValue';
import { Suit } from '../../../../../src/Context/Poker/Card/Domain/Suit';
describe('Test card domain entity', () => {
  let card: Card;
  beforeEach(() => {
    card = new Card(new CardValue('A'), new Suit('c'));
  });
  test('Cerate card using card notation', () => {
    const cardFromNotation = Card.createFromNotation('Ac');
    expect(card.equals(cardFromNotation));
  });

  test('Clone method should return new card with same value and suit', () => {
    const clonedCard = card.clone();
    expect(clonedCard.equals(card));
  });
});
