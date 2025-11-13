import { OpenAPIHono } from '@hono/zod-openapi';
import { apiReference } from '@scalar/hono-api-reference';
import { createAgentApp } from './modules/agent/agent';
import { createApiApp } from './modules/api';

// Create OpenAPI Hono app
const app = new OpenAPIHono();

// OpenAPI configuration
app.openAPIRegistry.registerComponent('securitySchemes', 'Bearer', {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'JWT',
});

// Register API routes (health, users, etc.)
const apiApp = createApiApp();
app.route('/', apiApp);

// Register agent routes
const agentApp = createAgentApp();
app.route('/agent', agentApp);

// OpenAPI JSON endpoint
app.doc('/openapi.json', {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'Health Agent API',
    description: 'API documentation for Health Agent v1',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
});

// Scalar API Reference UI
app.get(
  '/api-docs',
  apiReference({
    theme: 'default',
    layout: 'modern',
    url: '/openapi.json',
  })
);

// Root endpoint
app.get('/', (c) => {
  return c.json({
    message: 'Health Agent API v1',
    docs: '/api-docs',
    openapi: '/openapi.json',
  });
});

// Start server with Bun
const port = parseInt(process.env.PORT || '3000');

Bun.serve({
  port,
  fetch: app.fetch,
});

console.log(`🚀 Server is running on http://localhost:${port}`);
console.log(`📚 API Documentation: http://localhost:${port}/api-docs`);

