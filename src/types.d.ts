import { Request, Response } from 'express';

export interface HttpFunction {
  // eslint-disable-next-line no-unused-vars
  (request: Request, response: Response): Promise<void>;
}
