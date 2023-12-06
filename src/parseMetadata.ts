import { Request, Response } from 'express';

import { Sentry } from './lib/sentry';

interface HttpFunction {
  // eslint-disable-next-line no-unused-vars
  (request: Request, response: Response): Promise<void>;
}

export const parseMetadata: HttpFunction = Sentry.GCPFunction.wrapHttpFunction(
  async (request, response) => {
    Sentry.setTag('functionName', 'parseMetadata');

    const { name } = request.body;
    console.log('Parsing metadata:', name);

    // ...

    response.status(200).send({ status: 'OK' });

    return Promise.resolve();
  }
);
