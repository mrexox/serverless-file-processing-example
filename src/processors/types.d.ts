import {
  GetSignedUrlConfig,
  GetSignedUrlResponse,
  CreateReadStreamOptions,
} from '@google-cloud/storage';

/* eslint-disable no-unused-vars */

export interface StorageFile {
  name: string;
  getMetadata(): Promise<any>;
  setMetadata(meta: any): Promise<any>;
  download({ destination }: { destination: string }): Promise<any>;
  getSignedUrl(cfg: GetSignedUrlConfig): Promise<GetSignedUrlResponse>;
  createReadStream(options?: CreateReadStreamOptions): Readable;
}

export interface ProcessorFunc {
  (file: StorageFile): Promise<any>;
}
