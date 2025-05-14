export const setCorsHeaders = (req, init?) => {
  const origin = req.headers.get('origin') || '';
  const allowedOrigins = ['https://localhost:4433', 'http://localhost:5173'];
  const isAllowedOrigin = allowedOrigins.includes(origin);
  return {
    ...init,
    headers: {
      ...init?.headers,
      'Access-Control-Allow-Origin': isAllowedOrigin ? origin : allowedOrigins[0],
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-client-info, apikey',
    },
  };
};
