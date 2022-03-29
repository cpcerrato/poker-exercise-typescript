import { Suit } from '../../../../../src/Context/Poker/Card/Domain/Suit';
import { InvalidCardSuitError } from '../../../../../src/context/poker/card/domain/invalidCardSuitError';

describe('Test suit value object', () => {
  test('Given Heart suit notation lowercase "h" it should create "h" suit objet value', () => {
    const so = new Suit('h');
    expect(so.value).toBe('h');
  });

  test('Given Spades suit notation "s" it should create "s" suit objet value', () => {
    const so = new Suit('s');
    expect(so.value).toBe('s');
  });

  test('Given Clubs suit notation "c" it should create "c" suit objet value', () => {
    const so = new Suit('c');
    expect(so.value).toBe('c');
  });

  test('Given Diamonds suit notation "d" it should create "d" suit objet value', () => {
    const so = new Suit('d');
    expect(so.value).toBe('d');
  });

  test('Given valid suit notation uppercase should create right suit objet value', () => {
    const so = new Suit('H');
    expect(so.value).toBe('h');
  });

  test('Given not valid suit notation it should throw InvalidSuitError', () => {
    expect(() => new Suit('k')).toThrow(InvalidCardSuitError);
  });
});
