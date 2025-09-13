import dotenv from 'dotenv';

export type RuntimeEnv = {
  PORT: number;
  NODE_ENV: 'development' | 'test' | 'production';
  DATABASE_URL: string;
  CORS_ORIGIN: string | RegExp | (string | RegExp)[];
};

export function loadEnv(): RuntimeEnv {
  dotenv.config();
  const PORT = Number(process.env.PORT ?? 4000);
  const NODE_ENV = (process.env.NODE_ENV ?? 'development') as RuntimeEnv['NODE_ENV'];
  const DATABASE_URL = process.env.DATABASE_URL ?? '';
  const CORS_ORIGIN = process.env.CORS_ORIGIN ?? 'http://localhost:5173';

  if (!DATABASE_URL) {
    throw new Error('DATABASE_URL is required');
  }

  return { PORT, NODE_ENV, DATABASE_URL, CORS_ORIGIN };
}
