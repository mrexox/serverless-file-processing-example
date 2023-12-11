import * as path from 'path';
import * as fs from 'fs';

import { StorageFile } from '../processors/types';

interface Callback {
  // eslint-disable-next-line no-unused-vars
  (filename: string): Promise<any>;
}

// Handles downloading of a file to a local path and final cleanup.
export default async function withLocalFile(file: StorageFile, callback: Callback) {
  const destination = `/tmp/${plainName(file.name)}`;

  try {
    await file.download({ destination });
    return await callback(destination);
  } catch (e) {
    console.error('Error working with file', e.message);
    return {};
  } finally {
    if (fs.existsSync(destination)) {
      fs.unlinkSync(destination);
    }
  }
}

/**
 * Return plain name if `pathName` is nested.
 */
function plainName(pathName: string): string {
  return path.parse(pathName).base;
}
