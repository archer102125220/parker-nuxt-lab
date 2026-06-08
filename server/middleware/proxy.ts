export default defineEventHandler(async (event) => {
  const url = getRequestURL(event);
  if (url.pathname.startsWith('/parker-vue-lab/')) {
    const target = 'https://archer102125220.github.io' + url.pathname + url.search;
    
    // Copy incoming headers
    const headers = { ...event.node.req.headers } as Record<string, string>;
    
    // Delete accept-encoding to prevent double-decompression / encoding issues from GitHub Pages
    delete headers['accept-encoding'];
    delete headers['host'];
    
    // Proxy the request using h3's proxyRequest
    return proxyRequest(event, target, {
      headers,
      sendStream: true // Ensure stream is sent properly
    });
  }
});
