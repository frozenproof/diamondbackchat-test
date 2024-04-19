"use client";

import { Video, VideoOff } from "lucide-react";


import { useSocket } from "./providers/socket-provider";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { MediaRoomDirect } from "./livekit-call-room";
interface ChatVideoButtonInterface {
  directChannelId: string;
}
export const ChatVideoButton = (
  {
    directChannelId
  } : ChatVideoButtonInterface
) => {
  const { socketActual } = useSocket();

  if (!socketActual) {
    console.log("Socket is not running")
    return;
  }


  const onClick = () => {
    socketActual.emit("overlay",`chat:${directChannelId}:call`);
  }


  return (
      <Sheet>
      <SheetTrigger asChild>
            <Video className="h-6 w-6 text-zinc-500 dark:text-zinc-400" 
              onClick={onClick}
            />      
      </SheetTrigger>
      <SheetContent side="bottom" className="p-0 flex gap-0 w-full">
        <MediaRoomDirect 
          chatId={directChannelId}
        />
      </SheetContent>
    </Sheet>
  )
}