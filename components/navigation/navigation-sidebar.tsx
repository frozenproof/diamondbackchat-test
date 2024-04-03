"use server"

import { NavigationAction } from "@/components/navigation/navigation-action";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/uihelper/mode-toggle";

import { NavigationServerScroll } from "@/components/navigation/navigation-server-scroll";


import { NavigationSelf } from "./navigation-self";
import { SocketStatusDisplay } from "../socket/socket-status-display";
import { Suspense } from "react";

export const NavigationSideBar = (async (
    {userProfileIdNavigationSideBar} : {userProfileIdNavigationSideBar: string},
) => {
    return ( 
        <Suspense
            fallback={
                <div>
                    Loading
                </div>
            }
        >
        <div className="space-y-4 flex flex-col items-center h-full text-primary w-full "
            // style={{backgroundColor: '#00000000'}}
        >
            <div
                className="mt-[8px]"
            >
                <NavigationSelf 
                />
                <NavigationAction/>            
            </div>
            <Separator
                className=" bg-zinc-300 dark:bg-slate-700 rounded-md mx-auto"
            />          

            <NavigationServerScroll
                userProfileIdNavigationServerScroll={userProfileIdNavigationSideBar}
            />
            {/* </div> */}
            <div className="pb-3 mb-auto flex items-center flex-col gap-y-4">
            <SocketStatusDisplay />
                <ModeToggle />
            </div>
        </div>
        </Suspense>

     );
})
 