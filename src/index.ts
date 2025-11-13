import { OpenAPIHono, createRoute } from '@hono/zod-openapi';
import { apiReference } from '@scalar/hono-api-reference';
import { z } from 'zod';

// Create OpenAPI Hono app
const app = new OpenAPIHono();

// OpenAPI configuration
app.openAPIRegistry.registerComponent('securitySchemes', 'Bearer', {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'JWT',
});

// Example route: Health check
const healthRoute = createRoute({
  method: 'get',
  path: '/health',
  tags: ['Health'],
  summary: 'Health check endpoint',
  description: 'Returns the health status of the API',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            status: z.string(),
            timestamp: z.string(),
          }),
        },
      },
      description: 'Health status',
    },
  },
});

app.openapi(healthRoute, (c) => {
  return c.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

// Example route: Get user by ID
const getUserRoute = createRoute({
  method: 'get',
  path: '/users/{id}',
  tags: ['Users'],
  summary: 'Get user by ID',
  description: 'Retrieves a user by their ID',
  request: {
    params: z.object({
      id: z.string().openapi({
        param: {
          name: 'id',
          in: 'path',
        },
        example: '123',
      }),
    }),
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            id: z.string(),
            name: z.string(),
            email: z.string().email(),
          }),
        },
      },
      description: 'User found',
    },
    404: {
      description: 'User not found',
    },
  },
});

app.openapi(getUserRoute, (c) => {
  const { id } = c.req.valid('param');
  return c.json({
    id,
    name: 'John Doe',
    email: 'john@example.com',
  });
});

// Example route: Create user
const createUserRoute = createRoute({
  method: 'post',
  path: '/users',
  tags: ['Users'],
  summary: 'Create a new user',
  description: 'Creates a new user with the provided information',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.object({
            name: z.string().min(1).openapi({
              example: 'Jane Doe',
            }),
            email: z.string().email().openapi({
              example: 'jane@example.com',
            }),
          }),
        },
      },
    },
  },
  responses: {
    201: {
      content: {
        'application/json': {
          schema: z.object({
            id: z.string(),
            name: z.string(),
            email: z.string().email(),
            createdAt: z.string(),
          }),
        },
      },
      description: 'User created successfully',
    },
    400: {
      description: 'Invalid input',
    },
  },
});

app.openapi(createUserRoute, (c) => {
  const { name, email } = c.req.valid('json');
  return c.json(
    {
      id: Math.random().toString(36).substring(7),
      name,
      email,
      createdAt: new Date().toISOString(),
    },
    201
  );
});

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

