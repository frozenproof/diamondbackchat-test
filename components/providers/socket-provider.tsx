"use client";

import { 
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import { socketInstance } from "./socket-instance";

type SocketContextType = {
  socketActual: typeof socketInstance | any | null;
  isConnected: boolean;
};

const SocketContext = createContext<SocketContextType>({
  socketActual: null,
  isConnected: false,
});

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ 
  children 
}: { 
  children: React.ReactNode 
}) => {
  const [socket, setSocket] = useState(Object);
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");

  useEffect(() => {
    // console.log("Running provider of socket client");
    if (socketInstance.connected) {
      onConnect();
      socketInstance.on("hello", (arg) => {
        console.log(arg); // world
      });

      socketInstance.emit("emitting from provider", "this is emit from provider");
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socketInstance.io.engine.transport.name);

      socketInstance.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socketInstance.on("connect", onConnect);
    socketInstance.on("disconnect", onDisconnect);

    setSocket(socketInstance);
    return () => {
      socketInstance.off("connect", onConnect);
      socketInstance.off("disconnect", onDisconnect);
    };
  }, []);

  // console.log("This is socket client provider",socket)
  // console.log("This is socket client transport",transport)

  if(socket)
  return (
    <SocketContext.Provider value={{ socketActual: socketInstance, isConnected }}>
      {children}
    </SocketContext.Provider>
  )
}