import { CloudTasksClient } from '@google-cloud/tasks';

import {
  APP,
  GCLOUD_SERVICE_ACCOUNT_EMAIL,
  GCLOUD_TASKS_QUEUE,
  PROJECT_ID,
  REGION,
  STAGE,
} from './config';

const client = new CloudTasksClient();
const QUEUE = client.queuePath(PROJECT_ID as string, REGION, GCLOUD_TASKS_QUEUE);
const CLOUD_FUNCTIONS_URL = `https://${REGION}-${PROJECT_ID}.cloudfunctions.net/${APP}-${STAGE}-`;

/**
 * Enqueue a function call to Google Cloud Tasks service. This allows to run
 * some functions asynchronously. Google Cloud Tasks makes sure those functions
 * are executed.
 */
export function enqueue(functionName: string, args: any) {
  const url = CLOUD_FUNCTIONS_URL + functionName;

  const message = {
    httpRequest: {
      httpMethod: 1, // "POST"
      url,
      oidcToken: {
        serviceAccountEmail: GCLOUD_SERVICE_ACCOUNT_EMAIL,
      },
      headers: {
        'Content-Type': 'application/json',
      },
      body: Buffer.from(JSON.stringify(args)).toString('base64'),
    },
  };

  console.log('Enqueue', url, 'to', QUEUE);

  return client.createTask({ parent: QUEUE, task: message });
}
