import { fetchResults } from '../src/fetchResults';
import callHttpFunction from './support/callHttpFunction';
import * as results from '../src/lib/results';

describe('fetchResults', () => {
  beforeEach(() => {
    const documents = [
      {
        id: '1',
        size: 1024,
      },
    ];
    jest.spyOn(results, 'fetchResults').mockResolvedValue(documents);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('calls fetchResults', async () => {
    const args = { environment: 'test', limit: 1, orderBy: 'createdAt' };
    const [response, status] = await callHttpFunction(fetchResults, args);

    expect(results.fetchResults).toHaveBeenCalledWith(args);
    expect(response).toEqual({
      results: [
        {
          id: '1',
          size: 1024,
        },
      ],
    });
    expect(status).toEqual(200);
  });
});
