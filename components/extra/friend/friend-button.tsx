"use client"

import { Trees } from "lucide-react";
import { useRouter } from "next/navigation";

export const FriendButton = () => {
    const  router  = useRouter();

    const onAction = (MouseEvent: React.MouseEvent, url: string) => {
        MouseEvent.stopPropagation();
        router.push(url);
      }

    return ( 
        <button
            className="w-full hover:bg-[#88828814] dark:bg-primary  dark:hover:bg-[#282828]/90 h-[48px] p-[8x] "
            onClick={(MouseEvent) => {onAction(MouseEvent,`/meself/friend`)}}
        >
            <div 
                className="h-full flex items-center justify-center"
            >
                <Trees />
                  Friends
            </div>
        </button>
     );
}
 