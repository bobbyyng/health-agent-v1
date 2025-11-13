import { OpenAPIHono } from '@hono/zod-openapi';
import { healthRoute } from './api.route';
import { healthHandler } from './api.handler';

/**
 * Create and configure the API Hono app
 */
export function createApiApp(): OpenAPIHono {
  const app = new OpenAPIHono();

  // Register health route
  app.openapi(healthRoute, healthHandler);

  return app;
}

