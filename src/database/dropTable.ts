import db from './index';

(async () => {
  console.log('Dropping Tables in database');
  try {
    await db.queryNoParams('DROP TABLE IF EXISTS images CASCADE');
  } catch (err) {
    return err.stack;
  }
})();
