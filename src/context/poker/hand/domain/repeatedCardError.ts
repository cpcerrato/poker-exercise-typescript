export class RepeatedCardError extends Error {
  constructor(card: string) {
    super(`there is a duplicated card in the hand ${card}`);
  }
}
