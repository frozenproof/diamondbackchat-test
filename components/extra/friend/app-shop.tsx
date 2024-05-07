"use client"

import { LucideShoppingBag, TreeDeciduousIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export const ShopButton = () => {
    const  router  = useRouter();

    const onAction = (MouseEvent: React.MouseEvent, url: string) => {
        MouseEvent.stopPropagation();
        router.push(url);
      }

    return ( 
        <button
            className="w-full hover:bg-[#88828814] dark:bg-primary  dark:hover:bg-[#282828]/90 h-[72px] p-[8x] "
            onClick={(MouseEvent) => {onAction(MouseEvent,`/meself/botchat`)}}
        >
            <div 
                className="h-full flex items-center justify-center"
            >
                <TreeDeciduousIcon />
                  Mini Chatbot 
                  <div>
                This is experimental , may not work 
            </div>
            </div>
        </button>
     );
}
 