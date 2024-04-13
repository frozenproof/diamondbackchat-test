import { createServer } from "node:http";
import next from "next";
import { parse } from "url"
import { Server as ServerIO } from "socket.io";

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port })
const handler = app.getRequestHandler()

app.prepare().then(() => {
  const path = "/";
  const httpServer = createServer(async (req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true)
      const { pathname, query } = parsedUrl

      if (pathname === '/') {
        await app.render(req, res, '/')
      } else {
        await handler(req, res, parsedUrl, query)
      }
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  })
  .once('error', (err) => {
    console.error(err)
    process.exit(1)
  })
  .listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`)
  })

  const io = new ServerIO(httpServer,{
    addTrailingSlash: false,
    connectionStateRecovery: {
      // the backup duration of the sessions and the packets
      maxDisconnectionDuration: 2 * 60 * 1000,
      // whether to skip middlewares upon successful recovery
      skipMiddlewares: true,
    }
  });

  io.on("connection", (socket) => {
    console.log("This is from server")
    socket.onAny((event, ...args) => {
      console.log(`got ${event}`);
    });
  });
  
})