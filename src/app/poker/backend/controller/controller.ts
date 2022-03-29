import { Request, Response } from 'express';

export interface Controller {
  process(req: Request, res: Response): Promise<void>;
}
