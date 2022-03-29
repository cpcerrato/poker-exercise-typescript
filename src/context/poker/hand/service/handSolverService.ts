import { InvalidArgumentError } from '../../../shared/domain/valueObject/invalidArgumentError';
import { Hand } from '../domain/hand';

export class HandSolverService {
  async solve(cardArray: string[][]): Promise<string[]> {
    return new Promise<string[]>((resolve, _reject) => {
      if (cardArray.length !== 2) throw new InvalidArgumentError('cards array should contain two hands');
      const cardsHand1 = cardArray[0];
      const cardsHand2 = cardArray[1];
      const hand1 = Hand.fromCardNotationArray(cardsHand1);
      const hand2 = Hand.fromCardNotationArray(cardsHand2);
      const result = hand1.compare(hand2);
      if (result === -1) resolve(cardsHand2);
      if (result === 1) resolve(cardsHand1);
      resolve([]);
    });
  }
}
