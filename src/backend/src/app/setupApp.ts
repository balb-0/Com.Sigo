import express, { Application } from 'express';
import cors from 'cors';
import path from 'path';
import { loadEnv, RuntimeEnv } from '../config/env';
import { routes } from '../routes';
import { setupSwagger } from '../config/swagger';

export function createApp(env?: RuntimeEnv): Application {
  const resolvedEnv = env ?? loadEnv();
  const app = express();

  app.use(cors({ origin: resolvedEnv.CORS_ORIGIN, credentials: true }));
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));

  app.use('/uploads', express.static(path.join(process.cwd(), 'src', 'storage', 'uploads')));

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  /**
   * @openapi
   * /health:
   *   get:
   *     summary: Healthcheck da API
   *     tags: [System]
   *     responses:
   *       200:
   *         description: API saudável
   */

  app.use('/api', routes);

  setupSwagger(app);

  app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    // eslint-disable-next-line no-console
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  });

  return app;
}
