import { InvalidArgumentError } from './invalidArgumentError';

export abstract class ValueObject<T extends String | string | number | Boolean | boolean | Date> {
  private readonly _value: T;
  constructor(value: T) {
    this._value = value;
    this.ensureNotNullAndDefined(value);
  }
  get value(): T {
    return this._value;
  }
  private ensureNotNullAndDefined(value: T): void {
    if (value === undefined || value === null) throw new InvalidArgumentError('value must be defined and not null');
  }

  equals(other: ValueObject<T>): boolean {
    return this.value === other.value && this.constructor.name === this.constructor.name;
  }

  toString(): string {
    return this.value.toString();
  }
}
