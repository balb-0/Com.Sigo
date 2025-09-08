import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { Application } from 'express';

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
    apis: [],
  };
  const spec = swaggerJsdoc(options);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec));
}
