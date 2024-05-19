"use client"

import { LucideShoppingBag, TreeDeciduousIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export const CustomerPortal = () => {
    const  router  = useRouter();

    const onAction = (MouseEvent: React.MouseEvent, url: string) => {
        MouseEvent.stopPropagation();
        router.push(url);
      }

    return ( 
        <button
            className="w-full hover:bg-[#c4b5c414] dark:hover:bg-[rgb(121,120,120)] h-[48px] p-[8x] dark:bg-[#000000]"
            onClick={(MouseEvent) => {onAction(MouseEvent,`https://billing.stripe.com/p/login/test_9AQ9CW2l4dk6cKIaEE`)}}
        >
            <div 
                className="h-full flex items-center justify-center"
            >
                <LucideShoppingBag />
                  Customer Portal
                  <div>
            </div>
            </div>
        </button>
     );
}
 