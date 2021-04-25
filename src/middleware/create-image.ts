// src/middleware/not-found.middleware.ts

import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';

const upload = multer({ dest: path.join(__dirname, '../../uploads') });

export const createImageValidator = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const name = request.body.name;
  console.log(name);

  if (!name) {
    return response.status(400).send('image name is required');
  }

  next();
};
