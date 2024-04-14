import { createServer } from "node:http";
import next from "next";
import { parse } from "url";
import { Server as ServerIO } from "socket.io";


const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.PUBLIC_SITE_URL_LILTREE;
console.log(process.env.NODE_ENV)
const port = process.env.PORT || 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();
app.prepare().then(() => {
  // const pathToServer = "/server";
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
    },
    // path: pathToServer
  });


  io.on("connection", (socket) => {
    console.log("This is from server")
    socket.emit("hello", "this is server socket, say cheese");


    socket.on("channel-input",function(arg1_channelId,arg2_message_item,arg3_type_channel) {
      console.log("data from channel input",arg1_channelId,arg2_message_item.content,arg3_type_channel);
      // socket.broadcast.emit(arg1,arg2);
      io.emit(arg1_channelId,arg2_message_item,arg3_type_channel)
      })
  
      socket.on("channel-update",function(arg1_channelId,arg3_type_channel) {
        console.log("data from channel update",arg1_channelId,arg3_type_channel);
        // socket.broadcast.emit(arg1,arg2);
        io.emit(arg1_channelId,arg3_type_channel)
        })
  
    socket.onAny((event, ...args) => {
      console.log(`got ${event}`);
      console.log(`data from server.mjs is ${args}`);
    });
  });
})

