import { CardValue } from '../../../../../src/Context/Poker/Card/Domain/CardValue';
import { InvalidCardValueError } from '../../../../../src/Context/Poker/Card/Domain/InvalidCardValue';

describe('Test cardValue value object', () => {
  test('Given "A" string value should return valid "A" CardValue', () => {
    const vo = new CardValue('A');
    expect(vo.value).toBe('A');
  });

  test('Given "a" as string (lowercase) value should return valid "A" value object', () => {
    const vo = new CardValue('a');
    expect(vo.value).toBe('A');
  });

  test('Given "12" as value should throw an InvalidCardValueError', () => {
    expect(() => new CardValue('12')).toThrow(InvalidCardValueError);
  });

  test('Given "n" as value should throw an InvalidCardValueError', () => {
    expect(() => new CardValue('n')).toThrow(InvalidCardValueError);
  });

  test('Given two card values initialized with the same value should be equals', () => {
    const cv1 = new CardValue('a');
    const cv2 = new CardValue('a');
    expect(cv1.equals(cv2)).toBe(true);
  });

  test('Given two card values initialized with different values should not be equals', () => {
    const cv1 = new CardValue('a');
    const cv2 = new CardValue('t');
    expect(cv1.equals(cv2)).toBe(false);
  });

  test('Given "A", as CardValue index should be 13', () => {
    const vo = new CardValue('a');
    expect(vo.toIndex()).toBe(12);
  });

  test('Given "2", as CardValue index should be 0', () => {
    const vo = new CardValue('2');
    expect(vo.toIndex()).toBe(0);
  });

  test('Call cardValue compare method with greater cardValue should return -1', () => {
    const vo = new CardValue('2');
    const vo2 = new CardValue('3');
    expect(vo.compareIndex(vo2)).toBe(-1);
  });

  test('Call cardValue compare method with lower cardValue should return 1', () => {
    const vo = new CardValue('3');
    const vo2 = new CardValue('2');
    expect(vo.compareIndex(vo2)).toBe(1);
  });

  test('Call cardValue compare method with same cardValue should return 0', () => {
    const vo = new CardValue('2');
    const vo2 = new CardValue('2');
    expect(vo.compareIndex(vo2)).toBe(0);
  });

  test('Call class Method CardValue.indexOf with valid value should return index', () => {
    expect(CardValue.indexOf('A')).toBe(12);
  });

  test('Call class Method CardValue.indexOf with invalid value should return -1', () => {
    expect(CardValue.indexOf('Z')).toBe(-1);
  });
});
