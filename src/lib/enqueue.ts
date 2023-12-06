import { CloudTasksClient } from '@google-cloud/tasks'

import {
  googleCloudProps,
  googleCloudEmail,
  projectId,
} from './credentials'

const client = new CloudTasksClient(googleCloudProps)
const STAGE = process.env.STAGE as string
const PROJECT_ID = process.env.PROJECT_ID as string
const QUEUE_NAME = 'rate-limited-fileops'
const REGION = process.env.REGION as string
const QUEUE = client.queuePath(projectId, REGION, QUEUE_NAME)
const CLOUD_FUNCTIONS_URL =
  `https://${REGION}-${PROJECT_ID}.cloudfunctions.net/serverless-app-example-${STAGE}-`

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
  }

  return client.createTask({ parent: QUEUE, task: message })
}
