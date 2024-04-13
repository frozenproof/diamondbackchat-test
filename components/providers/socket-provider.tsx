"use client";

import { 
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import { socketInstance } from "./socket-instance";

type SocketContextType = {
  socketActual: any | null;
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
    console.log("Running provider of socket");
    if (socketInstance.connected) {
      onConnect();
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

  console.log("This is socket provider",socket)

  if(socket)
  return (
    <SocketContext.Provider value={{ socketActual: socketInstance, isConnected }}>
      {children}
    </SocketContext.Provider>
  )
}