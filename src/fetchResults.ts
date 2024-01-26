import { Sentry } from './lib/sentry';

import { HttpFunction } from './types';
import * as results from './lib/results';

export const fetchResults: HttpFunction = Sentry.GCPFunction.wrapHttpFunction(
  async (request, response) => {
    Sentry.setTag('functionName', 'fetchResults');

    const { environment, limit, orderBy } = request.body;
    try {
      const batch = await results.fetchResults({
        environment,
        limit,
        orderBy,
      });

      console.log(`Results # for ${environment}: ${batch.length}`);

      response.status(200).send({ results: batch });
      return Promise.resolve();
    } catch (e) {
      response.status(500).send();
      throw e;
    }
  }
);
