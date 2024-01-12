import * as fs from 'fs';
import * as path from 'path';
import { Readable } from 'stream';

import {
  GetSignedUrlConfig,
  GetSignedUrlResponse,
  CreateReadStreamOptions,
} from '@google-cloud/storage';

import { StorageFile } from '../../src/processors/types';

class MockStorageFile {
  readonly filepath: string;
  name: string;

  constructor(filepath: string, name: string) {
    this.filepath = filepath;
    this.name = name;
  }

  async getMetadata(): Promise<any> {
    return Promise.resolve({});
  }

  async setMetadata(): Promise<any> {
    return Promise.resolve({});
  }

  async download({ destination }: { destination: string }): Promise<any> {
    fs.copyFileSync(this.filepath, destination);
    return Promise.resolve({});
  }

  async getSignedUrl(_cfg: GetSignedUrlConfig): Promise<GetSignedUrlResponse> {
    return Promise.resolve(['url']);
  }

  createReadStream(_options?: CreateReadStreamOptions): Readable {
    return fs.createReadStream(this.filepath);
  }
}

export default function mockStorageFile(filepath: string): StorageFile {
  return new MockStorageFile(filepath, path.parse(filepath).base);
}
