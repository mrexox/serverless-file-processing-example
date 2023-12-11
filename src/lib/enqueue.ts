import { CloudTasksClient } from '@google-cloud/tasks';

import { googleCloudProps, googleCloudEmail, projectId } from './credentials';
import { FIRESTORE_DATABASE, REGION, PROJECT_ID, APP } from './config';

const client = new CloudTasksClient(googleCloudProps);
const QUEUE = client.queuePath(projectId, REGION, FIRESTORE_DATABASE);
const CLOUD_FUNCTIONS_URL = `https://${REGION}-${PROJECT_ID}.cloudfunctions.net/${APP}-`;

/**
 * Enqueue a function call to Google Cloud Tasks service. This allows to run
 * some functions asynchronously. Google Cloud Tasks makes sure those functions
 * are executed.
 */
export function enqueue(functionName: string, args: any) {
  const message = {
    httpRequest: {
      httpMethod: 1, // "POST"
      url: CLOUD_FUNCTIONS_URL + functionName,
      oidcToken: {
        serviceAccountEmail: googleCloudEmail,
      },
      headers: {
        'Content-Type': 'application/json',
      },
      body: Buffer.from(JSON.stringify(args)).toString('base64'),
    },
  };

  return client.createTask({ parent: QUEUE, task: message });
}
