import { Sentry } from './lib/sentry';

import { HttpFunction } from './types';
import * as results from './lib/results';

export const deleteResults: HttpFunction = Sentry.GCPFunction.wrapHttpFunction(
  async (request, response) => {
    Sentry.setTag('functionName', 'deleteResults');

    const { ids } = request.body;
    const batch = await results.deleteResults(ids);

    console.log('Deleted', batch.length, 'documents');

    response.status(200).send({ success: true });
  }
);
