export class InvalidCardSuitError extends Error {
  constructor(suit: string) {
    super(`invalid card suit ${suit}`);
  }
}
