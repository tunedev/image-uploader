import db from './index';

(async () => {
  console.log('Creating tables in database');
  try {
    await db.queryNoParams(`CREATE TABLE IF NOT EXISTS images(
      id SERIAL PRIMARY KEY,
      path VARCHAR(255) NOT NULL,
      name VARCHAR(50) NOT NULL,
      smallThumbnail VARCHAR(255) NOT NULL,
      largeThumbnail VARCHAR(255) NOT NULL,
      createdAt TIMESTAMPTZ DEFAULT NOW()
    )`);
  } catch (err) {
    return err.stack;
  }
})();
