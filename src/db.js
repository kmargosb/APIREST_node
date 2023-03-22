import { createPool } from "mysql2/promise";
import {
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  DB_USER,
  DB_PASSWORD,
} from './config.js';

// import fs from 'fs';

export const pool = createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  port: DB_PORT,
  database: DB_DATABASE
});

// const imageData = fs.readFileSync('public/img/casa1.jpg')
// export const imageBase64 = imageData.toString('base64')
