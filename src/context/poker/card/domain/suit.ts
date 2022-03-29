import { ValueObject } from '../../../shared/domain/valueObject/valueObject';
import { InvalidCardSuitError } from './invalidCardSuitError';
export class Suit extends ValueObject<string> {
  private static readonly Suites = ['s', 'c', 'h', 'd'];

  constructor(suit: string) {
    super(suit.toLowerCase());
    Suit.ensureValidSuit(suit);
  }

  private static ensureValidSuit(suit: string): void {
    if (Suit.Suites.indexOf(suit.toLowerCase()) < 0) throw new InvalidCardSuitError(suit);
  }
}
