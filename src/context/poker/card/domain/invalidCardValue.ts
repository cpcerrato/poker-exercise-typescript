export class InvalidCardValueError extends Error {
  constructor(cardValue: string) {
    super(`invalid card value ${cardValue}`);
  }
}
