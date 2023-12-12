# Serverless File Processing (example)

> This project provides an example serverless application for Google Cloud Platform.
>
> The application serves files created at Google Cloud Storage, starts the basic file processing, and stores the results to the Firestore database.

## Install

```bash
yarn install
```

## Deploy

1. Create a service account. See [how to do that](./.gcloud/README.md)
1. Enable **Cloud Functions API**
1. Enable **Google Task API**. Create a queue, put its name to `GCLOUD_TASKS_QUEUE` env variable
1. Create a Google Cloud Storage bucket. Put its name to the `BUCKET` env variable
1. Create a Firestore database and put its name to `FIRESTORE_DATABASE` env variable
1. Enable **Cloud Deployment Manager V2 API**
