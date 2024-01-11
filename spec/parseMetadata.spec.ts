import { parseMetadata } from '../src/parseMetadata';
import callHttpFunction from './support/callHttpFunction';
import * as processors from '../src/processors';

describe('parseMetadata', () => {
  beforeEach(() => {
    jest.spyOn(processors, 'call').mockResolvedValue({ result: 'done' });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('calls metadataParser processor', async () => {
    const name = 'c38859a5-9d25-433c-b22c-9420c74e8e8e';
    const [response, status] = await callHttpFunction(parseMetadata, { name });

    expect(processors.call).toHaveBeenCalledWith({
      name,
      processors: [processors.metadataParser],
      tag: 'metadata',
    });
    expect(response).toEqual({ result: 'done' });
    expect(status).toEqual(200);
  });
});
