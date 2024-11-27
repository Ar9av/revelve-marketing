import { onRequestGet as getCredits } from './api/credits.js';

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path.startsWith('/api/credits')) {
      return getCredits({ request });
    }

    return new Response('Not found', { status: 404 });
  }
};