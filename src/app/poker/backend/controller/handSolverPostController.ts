import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { HandSolverService } from '../../../../context/poker/hand/service/handSolverService';
import { Controller } from './Controller';

type HandSolverPostRequest = Request & {
  body: {
    hands: string[][];
  };
};
export class HandSolverPostController implements Controller {
  constructor(private handSolver: HandSolverService) {}

  async process(req: HandSolverPostRequest, res: Response) {
    try {
      const { hands } = req.body;
      const winner = await this.handSolver.solve(hands);
      res.status(httpStatus.OK).send({ winner });
    } catch (error) {
      res.status(httpStatus.BAD_REQUEST).send({ msg: (error as Error).message });
    }
  }
}
