import { createRoute, z } from '@hono/zod-openapi';

/**
 * Health check route definition
 */
export const healthRoute = createRoute({
  method: 'get',
  path: '/health',
  tags: ['Health'],
  summary: 'Health check endpoint',
  description: 'Returns the health status of the API',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z
            .object({
              status: z.string().openapi({
                description: 'Status of the API',
                example: 'ok',
              }),
              timestamp: z.string().openapi({
                description: 'Current timestamp',
                example: '2024-01-01T00:00:00.000Z',
              }),
            })
            .openapi({
              type: 'object',
              description: 'Health check response',
            }),
        },
      },
      description: 'Health status',
    },
  },
});

