import { Router, Request, Response } from 'express';
import { HandSolverService } from '../../../../context/poker/hand/service/handSolverService';
import { HandSolverPostController } from '../controller/handSolverPostController';
import { body, validationResult } from 'express-validator';
import httpStatus from 'http-status';

export const register = (router: Router) => {
  const handSolverPostController = new HandSolverPostController(new HandSolverService());
  router.post(
    '/hands/solve',
    body('hands').notEmpty().isArray({ min: 2, max: 2 }),
    async (req: Request, res: Response) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(httpStatus.BAD_REQUEST).json({ msg: errors.array() });
      }
      return handSolverPostController.process(req, res);
    }
  );
};
