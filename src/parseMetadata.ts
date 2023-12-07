import { Request, Response } from 'express';

import { Sentry } from './lib/sentry';

import * as processors from './processors';

interface HttpFunction {
  // eslint-disable-next-line no-unused-vars
  (request: Request, response: Response): Promise<void>;
}

export const parseMetadata: HttpFunction = Sentry.GCPFunction.wrapHttpFunction(
  async (request, response) => {
    Sentry.setTag('functionName', 'parseMetadata');

    const { name } = request.body;
    console.log('Parsing metadata:', name);

    const result = await processors.call({
      name,
      processors: [processors.metadataParser],
      tag: 'metadata',
    });

    response.status(200).send(result);

    return Promise.resolve();
  }
);
