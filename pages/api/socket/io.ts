import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";

import { NextApiResponseServerIo } from "@/type";

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = (_req: Request, res: NextApiResponseServerIo) => {
  if(res.socket.server.io)
  {
    console.log("IO server check",res.socket.server.io);
  }
  else {
    const path = "/api/socket/io";
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: path,
      // @ts-ignore,
      addTrailingSlash: false,
      connectionStateRecovery: {
        // the backup duration of the sessions and the packets
        maxDisconnectionDuration: 2 * 60 * 1000,
        // whether to skip middlewares upon successful recovery
        skipMiddlewares: true,
      }
    });
    res.socket.server.io = io;
  }
  
  res.end();
}

export default ioHandler;