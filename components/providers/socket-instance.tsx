"use client";

import { io } from "socket.io-client";
const pathToServer = "/server";

export const socketInstance = io({
    // path: pathToServer
});