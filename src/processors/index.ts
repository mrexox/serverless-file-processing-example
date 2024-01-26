import { Storage } from '@google-cloud/storage';

import { ProcessorFunc, StorageFile } from './types';
import { saveResults } from '../lib/results';
import { BUCKET } from '../lib/config';

const googleCloudStorage = new Storage();

export { metadataParser } from './metadataParser';

interface ProcessorOptions {
  name: string;
  processors: Array<ProcessorFunc>;
  tag: string;
}

/**
 * Calls the `processors` against the file with `name` and saves the results
 * with `tag` to the Firestore.
 *
 * @param options.name - File name
 * @param options.processors - An array of processors to be run against the file
 * @param options.tag - A tag to save the results with
 * @returns Results generated by `processors`
 */
export async function call({ name, processors, tag }: ProcessorOptions): Promise<any> {
  const file = await getGCSFile(name);

  let attributes: any = {};

  await Promise.all(
    processors.map(async (process) => {
      const result = await process(file);

      attributes = {
        ...attributes,
        ...result,
      };
    })
  );

  if (Object.keys(attributes).length === 0) {
    return {};
  }

  const res = await saveResults({
    tag,
    name,
    attributes,
  });

  console.log('Saved record to firestore as', res.id);

  return attributes;
}

/**
 * Retrieves the file object from GCS. Automatically assigns ContentType and
 * extension to file's metadata.
 *
 * @param {string} name - GCS ID
 * @param options
 * @param {string} options.bucket - An optional GCS bucket name, defaults to ENV[BUCKET]
 * @returns {Promise<StorageFile>}
 */
async function getGCSFile(name: string, { bucket = BUCKET } = {}): Promise<StorageFile> {
  const file = googleCloudStorage.bucket(bucket).file(name);

  await file.getMetadata();

  const ext = file.metadata?.metadata?.extension;
  const contentType = file.metadata?.contentType;

  if (ext && contentType) {
    return file;
  }

  const determined = await (await import('file-type')).fileTypeFromStream(file.createReadStream());
  if (!determined || !determined.mime) {
    return file;
  }

  let extension: string = ext || determined.ext;
  if (extension[0] !== '.') {
    extension = `.${extension}`;
  }

  await file.setMetadata({
    contentType: (contentType || determined.mime).toLowerCase(),
    metadata: { extension },
  });

  return file;
}
