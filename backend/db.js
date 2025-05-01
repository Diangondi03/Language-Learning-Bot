import { Pool } from 'pg';
import 'dotenv/config'

// Replace these values with your PostgreSQL database details
const pool = new Pool({
    user: process.env.DB_USER,
    host: 'localhost',
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });
  
pool.connect((err) => {
    if (err) {
      console.error('Error connecting to PostgreSQL database:', err.message);
    } else {
      console.log('Connected to PostgreSQL database');
    }
});
  
export default pool;