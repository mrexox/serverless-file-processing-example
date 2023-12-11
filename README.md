# Serverless File Processing (example)

> This project provides an example serverless application for Google Cloud Platform. The application serves files created at Google Cloud Storage, starts the basic file processing, and stores the results to the Firestore database.

## Install

```bash
yarn install
```

## Deploy

1. Create a service account. See [how to do that](./.gcloud/README.md)
1. Enable **Cloud Functions API**
1. Enable **Google Task API**
1. Create a Google Cloud Storage bucket. Put its name to the `BUCKET` env variable
1. Create a Firestore database and put its name to `FIRESTORE_DATABASE` env variable
