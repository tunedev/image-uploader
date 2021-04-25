// src/items/items.service.ts

/**
 * Data Model Interfaces
 */
import { BaseImage, Image } from './image.interface';
import { Images } from './images.interface';
import db from '../database';

/**
 * In-Memory Store
 */

/**
 * Service Methods
 */

export const findAll = async (): Promise<Image[]> => {
  try {
    const result = await db.queryNoParams(
      `SELECT id, name, path, smallthumbnail, largethumbnail FROM images`
    );

    return result.rows;
  } catch (err) {
    return err.code;
  }
};

export const find = async (id: number): Promise<Image> => {
  const result = await db.query(
    'SELECT id, name, path, smallthumbnail, largethumbnail FROM images WHERE id = $1',
    [id]
  );

  return result.rows[0];
};

export const create = async (newItem: BaseImage): Promise<any> => {
  const name = ['name', 'path', 'smallthumbnail', 'largethumbnail'];
  const params = [
    newItem.name,
    newItem.path,
    newItem.smallthumbnail,
    newItem.largethumbnail,
  ];

  try {
    const result = await db.query(
      `INSERT INTO images (${name.join(
        ', '
      )}) VALUES($1, $2, $3, $4) RETURNING id, name`,
      params
    );

    return result.rows[0];
  } catch (err) {
    return err.code;
  }
};
