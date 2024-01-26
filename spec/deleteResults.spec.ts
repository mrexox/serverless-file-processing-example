import { deleteResults } from '../src/deleteResults';
import callHttpFunction from './support/callHttpFunction';
import * as results from '../src/lib/results';

describe('deleteResults', () => {
  beforeEach(() => {
    jest.spyOn(results, 'deleteResults').mockResolvedValue(['1', '2'] as any);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('calls deleteResults', async () => {
    const args = { ids: ['1', '2'] };
    const [response, status] = await callHttpFunction(deleteResults, args);

    expect(results.deleteResults).toHaveBeenCalledWith(['1', '2']);
    expect(response).toEqual({ success: true });
    expect(status).toEqual(200);
  });
});
