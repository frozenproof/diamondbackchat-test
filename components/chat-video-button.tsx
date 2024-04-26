"use client";

import { Video } from "lucide-react";

import { useSocket } from "./providers/socket-provider";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { MediaRoomDirect } from "./livekit-call-room";
import { UserProfile } from "@prisma/client";
interface ChatVideoButtonInterface {
  directChannelId: string;
  otherUserIdSocket: string;
  currentUser: UserProfile;
}
export const ChatVideoButton = (
  {
    directChannelId,
    otherUserIdSocket,
    currentUser
  } : ChatVideoButtonInterface
) => {
  const { socketActual } = useSocket();

  if (!socketActual) {
    console.log("Socket is not running")
    return;
  }

  const onClick = () => {
    socketActual.emit("calling_user",otherUserIdSocket,currentUser);
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