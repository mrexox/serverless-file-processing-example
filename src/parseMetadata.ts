import { Sentry } from './lib/sentry';

import { HttpFunction } from './types';
import * as processors from './processors';

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
