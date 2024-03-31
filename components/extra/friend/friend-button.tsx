"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const FriendButton = () => {
    const  router  = useRouter();

    const onAction = (MouseEvent: React.MouseEvent, url: string) => {
        MouseEvent.stopPropagation();
        router.push(url);
      }

    return ( 
        <button
            onClick={(MouseEvent) => {onAction(MouseEvent,`/meself/friend`)}}
        >
            <Button 
                className="h-full w-full"
            >
                Friends
            </Button>
        </button>
     );
}
 