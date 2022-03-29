import { RepeatedCardError } from '../../../../../src/Context/Poker/Hand/Domain/RepeatedCardError';
import { InvalidCardValueError } from '../../../../../src/context/poker/card/domain/invalidCardValue';
import { InvalidCardSuitError } from '../../../../../src/context/poker/card/domain/invalidCardSuitError';
import { InvalidHandCardCountError } from '../../../../../src/Context/Poker/Hand/Domain/InvalidHandCardCountError';
import { InvalidArgumentError } from '../../../../../src/Context/Shared/Domain/ValueObject/InvalidArgumentError';
import { HandSolverService } from '../../../../../src/Context/Poker/Hand/Service/HandSolverService';
let solver: HandSolverService;

beforeAll(() => {
  solver = new HandSolverService();
});

const testHands: [string[], string[], string[]][] = [
  [
    ['5c', '2s', '6s', '3c', '4d'],
    ['5s', '2c', 'As', '3d', '4c'],
    ['5c', '2s', '6s', '3c', '4d']
  ],
  [
    ['3c', 'Jc', '2d', 'Js', 'Kc'],
    ['4s', 'Kh', '7h', 'Kd', 'Qc'],
    ['4s', 'Kh', '7h', 'Kd', 'Qc']
  ],
  [['9c', '3h', 'Ah', '5d', '7c'], ['9s', '3d', 'As', '5c', '7h'], []],
  [
    ['5c', '2s', '6s', '3c', '4d'],
    ['5c', '2c', 'As', '3c', '4d'],
    ['5c', '2s', '6s', '3c', '4d']
  ]
];
describe('Testing hand solver use case', () => {
  test('Given a hand with invalid card value, throws an InvalidCardValueError', async () => {
    const cardsArray = [
      ['3s', 'Kc', 'Ad', '2c', 'Qc'],
      ['7s', '3h', 'ph', '5d', '7c']
    ];
    await expect(solver.solve(cardsArray)).rejects.toThrow(InvalidCardValueError);
  });

  test('Given a hand with invalid suit, throws an InvalidCardSuitError', async () => {
    const cardsArray = [
      ['3s', 'Kc', 'Ad', '2c', 'Qc'],
      ['7s', '3h', '5n', '5d', '7c']
    ];
    await expect(solver.solve(cardsArray)).rejects.toThrow(InvalidCardSuitError);
  });

  test('Given hands with repeated cards, throws an RepeatedCardError', async () => {
    const cardsArray = [
      ['3s', 'Kc', 'Ad', 'Qc', 'Qc'],
      ['7s', '3h', '5h', '5d', '7c']
    ];
    await expect(solver.solve(cardsArray)).rejects.toThrow(RepeatedCardError);
  });

  test('Given a hand with less than 5 cards, throws an InvalidHandCardCountError', async () => {
    const cardsArray = [
      ['3s', 'Kc', 'Ad', '2c'],
      ['7s', '3h', '5h', '5d', '7c']
    ];
    await expect(solver.solve(cardsArray)).rejects.toThrow(InvalidHandCardCountError);
  });

  test('Given only one hand, throw an InvalidArgumentError', async () => {
    const cardsArray = [['7s', '3h', '5n', '5d', '7c']];
    await expect(solver.solve(cardsArray)).rejects.toThrow(InvalidArgumentError);
  });

  test('Given more than two hands, throw an InvalidHandCardCountError', async () => {
    const cardsArray = [
      ['3s', 'Kc', 'Ad', '2c', 'Qc'],
      ['7s', '3h', '5n', '5d', '7c'],
      ['3s', 'Ks', 'As', '2s', 'Qs']
    ];
    await expect(solver.solve(cardsArray)).rejects.toThrow(InvalidArgumentError);
  });

  test.each(testHands)('Given hands %p and %p, return %p', async (hand1, hand2, winner) => {
    await expect(solver.solve([hand1, hand2])).resolves.toEqual(winner);
  });
});
