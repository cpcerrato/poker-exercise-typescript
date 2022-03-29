import { CardValue } from './cardValue';
import { Suit } from './suit';
import { InvalidCardNotationError } from './invalidCardNotationError';

export class Card {
  private readonly _suit: Suit;
  private readonly _value: CardValue;

  constructor(value: CardValue, suit: Suit) {
    this._suit = suit;
    this._value = value;
  }

  static createFromNotation(cardNotation: string): Card {
    if (cardNotation.length > 2) throw new InvalidCardNotationError(cardNotation);
    return new Card(new CardValue(cardNotation[0] as string), new Suit(cardNotation[1]));
  }

  equals(other: Card): boolean {
    return this.hasSameSuit(other) && this.hasSameValue(other);
  }

  public get suit(): string {
    return this._suit.value;
  }

  get value(): string {
    return this._value.value;
  }

  get valueIndex(): number {
    return this._value.toIndex();
  }

  hasSameValue(other: Card): boolean {
    return this._value.equals(new CardValue(other.value));
  }

  compare(other: Card): number {
    return this._value.compareIndex(new CardValue(other.value));
  }

  hasSameSuit(other: Card): boolean {
    return this._suit.equals(new Suit(other.suit));
  }

  clone(): Card {
    return new Card(this._value, this._suit);
  }

  toString(): string {
    return `${this._value.value}${this._suit.value}`;
  }
}
