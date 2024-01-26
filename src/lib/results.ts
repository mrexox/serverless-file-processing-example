import { Firestore } from '@google-cloud/firestore';

import { STAGE, PROJECT_ID, FIRESTORE_COLLECTION } from '../lib/config';

const firestore = new Firestore({
  projectId: PROJECT_ID,
  timestampsInSnapshots: true,
  ignoreUndefinedProperties: true,
});
const collection = firestore.collection(FIRESTORE_COLLECTION);

export async function fetchResults({
  environment,
  limit = 1000,
  orderBy,
}: {
  environment: string;
  limit: number;
  orderBy?: string;
}) {
  let query = collection.where('environment', '==', environment);

  if (orderBy) {
    query = query.orderBy(orderBy);
  }

  const documents = (await query.limit(limit).get()).docs;

  return documents.map((d) => {
    return { ...d.data(), id: d.id };
  });
}

export async function saveResults({
  tag,
  name,
  attributes,
  environment = STAGE,
}: {
  tag: string;
  name: string;
  attributes: any;
  environment?: string;
}) {
  return collection.add({
    tag,
    name,
    attributes,
    environment,
    createdAt: Date.now(),
  });
}

export async function deleteResults(ids: string[]) {
  return Promise.all(ids.map((id) => collection.doc(id).delete()));
}
