"use client"

import { NavigationItem } from "@/components/navigation/navigation-item";
import { EvervaultCardVer2 } from "../effects/evervault/EvervaultCardVer2";
import { NavigationSelf } from "./navigation-self";

import { Server } from "@prisma/client";
import { Separator } from "../ui/separator";


export const NavigationServerScroll = (
   {serversProp: servers }:{serversProp: Server[]}, 
) => {
    return (
        <div
            className="h-full space-y-[8px]"
        >
            <div
                id="navigation"
            >
                <NavigationSelf 
                />
            </div>
            <Separator
                className=" bg-zinc-300 dark:bg-slate-700 rounded-md mx-auto"
            />     
            {/* <ScrollArea className="w-3/5 flex flex-col gap-y-4 overflow-y-auto"> */}            
            <div className="flex flex-col gap-y-4 overflow-y-auto serverscroll h-full">
                {servers.map((server) => 
                    {
                        return(
                            <div
                                key={server.id} 
                            >
                            {/* <EvervaultCardVer2 className="" key={server.id}>                 */}
                                <div className="mt-[12px] mb-[12px]">
                                    <NavigationItem 
                                        id={server.id}
                                        name={server.name}
                                        imageUrl={server.imageUrl}
                                    />
                                </div>
                            {/* </EvervaultCardVer2> */}
                            </div>
                            ) 
                    }
                    )
                }
            </div>
        </div>   
    )
}