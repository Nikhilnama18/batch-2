const http = require("http");
const app = require("./src/app");
const host = process.env.host;
const port = process.env.port;

const server = http.createServer(app);

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});
