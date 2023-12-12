export const APP = process.env.APP || 'file-processing-app-example';
export const BUCKET = process.env.BUCKET || 'file-processing-bucket-4321';
export const FIRESTORE_DATABASE = process.env.FIRESTORE_DATABASE || 'file-processing-results';
export const GCLOUD_SERVICE_ACCOUNT_EMAIL =
  process.env.GCLOUD_SERVICE_ACCOUNT_EMAIL || `${APP}@appspot.gserviceaccount.com`;
export const GCLOUD_TASKS_QUEUE = process.env.GCLOUD_TASKS_QUEUE || 'file-processing';
export const PROJECT_ID = process.env.PROJECT_ID;
export const REGION = process.env.REGION || 'us-central1';
export const STAGE = process.env.STAGE || 'production';
