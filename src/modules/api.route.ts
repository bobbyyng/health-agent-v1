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

