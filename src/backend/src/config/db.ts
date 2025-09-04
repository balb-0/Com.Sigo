import { Pool } from 'pg';
import { loadEnv } from './env';

let pool: Pool | null = null;

export function getDb(): Pool {
  if (!pool) {
    const env = loadEnv();
    pool = new Pool({ connectionString: env.DATABASE_URL });
  }
  return pool;
}
