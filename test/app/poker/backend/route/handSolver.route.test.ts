import { Server } from '../../../../../src/app/poker/backend/Server';
import supertest from 'supertest';

const server = new Server('5000');
const request = supertest(server.app);

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
  ],
  [
    ['5c', '6s', '6d', '6c', '4d'],
    ['5c', '6S', '6d', '6C', 'Kd'],
    ['5c', '6S', '6d', '6C', 'Kd']
  ],
  [
    ['Ac', '3s', '2d', '4c', '5d'],
    ['5d', '3s', '6d', '4c', '7d'],
    ['5d', '3s', '6d', '4c', '7d']
  ]
];

describe('Poker app backend, test hand solver route', () => {
  test('POST to /solve with repeated card should return 400', async () => {
    const response = await request.post('/hands/solve').send({
      hands: [
        ['5c', '6s', '6d', '6c', '4d'],
        ['5c', '6s', '6c', '6c', 'Kd']
      ]
    });
    expect(response.statusCode).toEqual(400);
    expect(response.body).toHaveProperty('msg');
  });

  test('POST to /solve with amount of cards in hands should return 400', async () => {
    const response = await request.post('/hands/solve').send({
      hands: [
        ['5c', '6s', '6d', '6c', '4d'],
        ['5c', '6s', '6c', '6c']
      ]
    });
    expect(response.statusCode).toEqual(400);
    expect(response.body).toHaveProperty('msg');
  });

  test.each(testHands)(
    'POST /solve with { "hands": [%p, %p] }, return object { winner: %p }',
    async (hand1, hand2, winner) => {
      const response = await request.post('/hands/solve').send({
        hands: [hand1, hand2]
      });
      expect(response.statusCode).toEqual(200);
      expect(response.body).toStrictEqual({ winner });
    }
  );
});
