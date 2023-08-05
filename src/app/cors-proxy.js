const corsProxy = require('cors-anywhere');

const host = '0.0.0.0';
const port = 8080;

corsProxy.createServer({
  originWhitelist: [], // Allow all origins
}).listen(port, host, () => {
  console.log(`CORS Anywhere proxy server running on ${host}:${port}`);
});
