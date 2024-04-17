"use client";

import { useSearchParams } from "next/navigation";
import { Video, VideoOff } from "lucide-react";


import { ActionTooltip } from "./uihelper/action-tooltip";
import { useSocket } from "./providers/socket-provider";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
interface ChatVideoButtonInterface {
  directChannelId: string;
}
export const ChatVideoButton = (
  {
    directChannelId
  } : ChatVideoButtonInterface
) => {
  const { socketActual } = useSocket();
  const searchParams = useSearchParams();

  const isVideo = searchParams?.get("video");
  if (!socketActual) {
    console.log("Socket is not running")
    return;
  }


  const onClick = () => {
    socketActual.emit("overlay");
  }

  const Icon = isVideo ? VideoOff : Video;

  return (
      <Sheet>
      <SheetTrigger asChild>
        <Button 
        variant="ghost" size="icon" className="ml-auto">
            <Icon className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />      
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="p-0 flex gap-0 ">

      </SheetContent>
    </Sheet>
  )
}