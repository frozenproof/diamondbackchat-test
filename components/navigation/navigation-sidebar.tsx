"use server"

import { NavigationAction } from "@/components/navigation/navigation-action";
import { ModeToggle } from "@/components/uihelper/mode-toggle";
import { NavigationServerScroll } from "@/components/navigation/navigation-server-scroll";
import { SocketStatusDisplay } from "@/components/socket/socket-status-display";
import { Suspense } from "react";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export const NavigationSideBar = (async (
    {userProfileIdNavigationSideBar} : {userProfileIdNavigationSideBar: string},
) => {

    const servers = await db.server.findMany({
        where: {
            Member:{
                some:{
                    userProfileId: userProfileIdNavigationSideBar,
                }
            },
            deleted: false,
        }
    })
    
    if(!servers)
    {
        return redirect("/meself/friend");
    }
    
    return ( 
        <Suspense
            fallback={
                <div>
                    Loading
                </div>
            }
        >
        <div className="pt-[8px] space-y-[8px] flex flex-col items-center h-full text-primary w-full "
            // style={{backgroundColor: '#00000000'}}
        >
            <div
                // className="bg-red-800"
            >
                <NavigationAction/>            
            </div>
     

            <div
                id="serverscroll"
                className="h-full"
            >
                <NavigationServerScroll
                    serversProp={servers}
                />
            </div>
            
            <div className="pb-3 mb-auto flex items-center flex-col gap-y-4">
            <SocketStatusDisplay />
                <ModeToggle />
            </div>
        </div>
        </Suspense>

     );
})
 