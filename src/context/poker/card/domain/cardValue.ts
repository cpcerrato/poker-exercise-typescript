import { ValueObject } from '../../../shared/domain/valueObject/valueObject';
import { InvalidCardValueError } from './invalidCardValue';

export class CardValue extends ValueObject<string> {
  private static readonly AllowedValues = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
  constructor(cardValue: string) {
    super(cardValue.toUpperCase());
    this.ensureValidValue(cardValue.toUpperCase());
  }
  private ensureValidValue(cardValue: string): void {
    if (CardValue.indexOf(cardValue) < 0) throw new InvalidCardValueError(cardValue);
  }

  static indexOf(value: string): number {
    return this.AllowedValues.indexOf(value.toUpperCase());
  }

  toIndex(): number {
    return CardValue.AllowedValues.indexOf(this.value);
  }

  compareIndex(other: CardValue): number {
    if (this.toIndex() < other.toIndex()) return -1;
    if (this.toIndex() > other.toIndex()) return 1;
    return 0;
  }
}
