"use client";

import { useSocket } from "@/components/providers/socket-provider";
import { Badge } from "@/components/ui/badge";

export const SocketStatusDisplay = () => {
  const { isConnected } = useSocket();

  if (!isConnected) {
    return (
      <Badge 
        variant="outline" 
        className="bg-[#ff0008] text-white border-none ml-auto "
      >
        Offline
      </Badge>
    )
  }

  return (
    <Badge 
      variant="outline" 
      className="bg-emerald-600 text-white border-none ml-auto"
    >
      Online
    </Badge>
  )
}