import { Request, Response, response as MockResponse } from 'express';
import { HttpFunction } from '../../src/types';

/**
 * A helper for calling HTTP functions
 *
 * @example
 *   const [res, status] = await callHttpFunction(cloudFunction, bodyObject)
 */
export default async function callHttpFunction(
  fn: HttpFunction,
  body: any
): Promise<[any, number]> {
  let responseData: any = null;
  let statusCode: number = 200;

  const response = Object.create(MockResponse);
  response.status = (code: number) => {
    statusCode = code;
    return response;
  };
  response.send = (data: any) => {
    responseData = data;
    return response;
  };

  try {
    await fn({ body } as Request, response as Response);
    return [responseData, statusCode];
  } catch (_e) {
    return [responseData, statusCode];
  }
}
