import sharp from 'sharp';

import withLocalFile from '../lib/withLocalFile';
import { ProcessorFunc } from './types';

interface Metadata {
  width?: number | string;
  height?: number | string;
  format?: string;
  channels?: number | string;
  hasAlpha?: boolean;
  orientation?: number;
}

export const metadataParser: ProcessorFunc = async function (file): Promise<Metadata> {
  return await withLocalFile(file, async (filepath: string): Promise<Metadata> => {
    const { width, height, format, channels, hasAlpha, orientation } =
      await sharp(filepath).metadata();

    return {
      width,
      height,
      format,
      channels,
      hasAlpha,
      orientation,
    };
  });
};
