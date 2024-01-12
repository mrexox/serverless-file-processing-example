import * as path from 'path';

import mockStorageFile from '../support/mockStorageFile';
import { metadataParser } from '../../src/processors/metadataParser';

describe('metadataParser', () => {
  it('returns correct image metadata', async () => {
    const file = mockStorageFile(path.join(__dirname, '../fixtures/image.png'));
    const metadata = await metadataParser(file);
    expect(metadata).toEqual({
      channels: 3,
      format: 'png',
      hasAlpha: false,
      height: 1008,
      orientation: 1,
      width: 756,
    });
  });
});
