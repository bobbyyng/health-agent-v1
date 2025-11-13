/**
 * Health check handler
 */
export function healthHandler(c: any) {
  return c.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
}

