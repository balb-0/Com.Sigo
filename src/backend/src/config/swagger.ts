import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { Application } from 'express';
import path from 'path';

export function setupSwagger(app: Application) {
  const options: swaggerJsdoc.Options = {
    definition: {
      openapi: '3.1.0',
      info: {
        title: 'ES07 G03 API',
        version: '1.0.0',
      },
      servers: [{ url: '/api' }],
    },
    apis: [
      // Route files
      path.join(process.cwd(), 'src', 'routes', '**', '*.ts'),
      // Controllers (if any endpoint-level docs are placed there)
      path.join(process.cwd(), 'src', 'controllers', '**', '*.ts'),
      // App-level endpoints like /health
      path.join(process.cwd(), 'src', 'app', 'setupApp.ts'),
    ],
  };
  const spec = swaggerJsdoc(options);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec, { explorer: true }));
}
