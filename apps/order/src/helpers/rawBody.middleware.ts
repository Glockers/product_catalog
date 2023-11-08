import { json } from 'body-parser';
import { RequestWithRawBody } from '../types';
import { Response } from 'express';

export const rawBodyMiddleware = () => {
  return json({
    verify: (request: RequestWithRawBody, _: Response, buffer: Buffer) => {
      if (request.url === '/stripe_webhook' && Buffer.isBuffer(buffer)) {
        request.rawBody = Buffer.from(buffer);
      }
      return true;
    }
  });
};
