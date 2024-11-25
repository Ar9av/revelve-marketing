export async function onRequest(context) {
    // Enable CORS
    context.request.headers.set('Access-Control-Allow-Origin', '*');
    context.request.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    context.request.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
    // Handle preflight requests
    if (context.request.method === 'OPTIONS') {
      return new Response(null, { status: 204 });
    }
  
    // Example middleware: Authentication
    if (context.request.method !== 'OPTIONS') {
      const authorization = context.request.headers.get('Authorization');
      if (!authorization) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
      }
  
      // Assume a simple Bearer token authorization
      const token = authorization.replace('Bearer ', '');
      // Validate token (this is a placeholder, replace with proper validation)
      if (token !== 'VALID_TOKEN') {
        return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 403 });
      }
  
    //   context.user = { id: 'userId', name: 'User Name' };
    }
  
    // Continue to the function
    return await context.next();
  }