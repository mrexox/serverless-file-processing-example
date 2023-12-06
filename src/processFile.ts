import { Sentry } from './lib/sentry';
import { enqueue } from './lib/enqueue';

interface EventFunction {
  // eslint-disable-next-line no-unused-vars
  (data: Record<string, any>, context: any, callback: Function): Promise<void>;
}

/**
 * Process a file created in GCS.
 *
 * @param {Record} data
 * @param {string} data.name - GCS ID
 * @param {Context} context - Not used yet
 * @param {Function} callback
 */
export const processFile: EventFunction = Sentry.GCPFunction.wrapEventFunction(
  async (data: Record<string, any>, _context: any, callback: Function) => {
    Sentry.setTag('functionName', 'processFile');

    const { name } = data;
    console.log('Handling new file:', name);

    await enqueue('process_metadata', { name });

    callback(); // success
  }
);
