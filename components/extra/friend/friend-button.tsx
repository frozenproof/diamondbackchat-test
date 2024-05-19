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
            className="w-full hover:bg-[rgba(231,189,231,0.08)]dark:hover:bg-[rgb(121,120,120)] h-[48px] p-[8x] dark:bg-[#000000] "
            onClick={(MouseEvent) => {onAction(MouseEvent,`/meself/friend`)}}
        >
            <div 
                className="h-full flex items-center justify-center "
            >
                <Trees />
                  Friends
            </div>
        </button>
     );
}
 