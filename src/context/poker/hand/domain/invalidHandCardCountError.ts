export class InvalidHandCardCountError extends Error {
  constructor(count: number) {
    super(`invalid hand. Card count: ${count}`);
  }
}
