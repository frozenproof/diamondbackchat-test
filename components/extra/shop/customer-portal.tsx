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
            className="w-full hover:bg-[#88828814] dark:bg-primary  dark:hover:bg-[#282828]/90 h-[48px] p-[8x] "
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
 