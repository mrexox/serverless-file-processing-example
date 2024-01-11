import { processFile } from '../src/processFile';
import * as enqueue from '../src/lib/enqueue';

describe('processFile', () => {
  beforeEach(() => {
    jest.spyOn(enqueue, 'enqueue').mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('enqueues parse_metadata http function', async () => {
    const name = 'c38859a5-9d25-433c-b22c-9420c74e8e8e';
    await processFile({ name }, {}, () => {});

    expect(enqueue.enqueue).toHaveBeenCalledWith('parse_metadata', { name });
  });
});
