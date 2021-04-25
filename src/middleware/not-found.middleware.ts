// src/middleware/not-found.middleware.ts

import { Request, Response, NextFunction } from 'express';

export const notFoundHandler = (
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  const message = 'Resource not found';

  return response.status(404).send(message);
};
