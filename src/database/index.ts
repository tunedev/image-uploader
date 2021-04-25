import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

// Connect to Database
const pool = new Pool({ connectionString: process.env.DB_URI });

// Entry point to every database transaction
export default {
  query: (sqlCommand: string, params: Array<any>) =>
    pool.query(sqlCommand, params),
  queryNoParams: (sqlCommand: string) => pool.query(sqlCommand),
};
