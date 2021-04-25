/**
 * Required External Modules and Interfaces
 */

import express, { Request, response, Response } from 'express';
import sharp from 'sharp';
import * as ImageService from './images.service';
import { BaseImage, Image } from './image.interface';
import multer from 'multer';
import path from 'path';

const upload = multer({ dest: path.join(__dirname, '../../uploads') });
/**
 * Router Definition
 */
export const imagesRouter = express.Router();

/**
 * Controller Definitions
 */

imagesRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const images: Image[] = await ImageService.findAll();
    return res.status(200).send({
      status: 'success',
      data: images.map((item) => ({ id: item.id, name: item.name })),
    });
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

// GET images/:id

imagesRouter.get('/:id', async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const image: Image = await ImageService.find(id);

    if (image) {
      return res.status(200).send(image);
    }

    res.status(404).send('item not found');
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// POST images

imagesRouter.post(
  '/',
  upload.single('image'),
  async (req: Request, res: Response) => {
    try {
      const name: string = req.body.name;
      const path = req.file.path;

      const smallthumbnail = `${path}-timg200.jpg`;
      const largethumbnail = `${path}-timg300.jpg`;

      const timgCallback = (err: Error) => {
        if (err) {
          console.log(err);

          return response
            .status(500)
            .send('Error turning image to a thumbnail');
        }
      };

      await sharp(path).resize(200).toFile(smallthumbnail, timgCallback);
      await sharp(path).resize(300).toFile(largethumbnail, timgCallback);

      const image: BaseImage = {
        name,
        path,
        smallthumbnail,
        largethumbnail,
      };

      const newImage = await ImageService.create(image);

      res.status(201).json({ message: 'success', data: newImage });
    } catch (e) {
      res.status(500).send(e.message);
    }
  }
);
