export class InvalidCardNotationError extends Error {
  constructor(cardNotation: string) {
    super(`invalid card notation ${cardNotation} valid format is value followed by suit`);
  }
}
