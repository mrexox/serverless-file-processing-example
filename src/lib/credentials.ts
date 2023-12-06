import fs from 'fs'
const creds = JSON.parse(fs.readFileSync(process.env.GCLOUD_CREDENTIALS as string, 'utf-8'))

export const googleCloudProps = {
  keyFilename: process.env.GCLOUD_CREDENTIALS,
}
export const googleCloudEmail = creds.client_email
export const projectId = creds.project_id
