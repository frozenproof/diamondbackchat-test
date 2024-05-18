"use server"

import { NavigationAction } from "@/components/navigation/navigation-action";
import { ModeToggle } from "@/components/uihelper/mode-toggle";
import { NavigationServerScroll } from "@/components/navigation/navigation-server-scroll";
import { SocketStatusDisplay } from "@/components/socket/socket-status-display";
import { Suspense } from "react";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { NotificationButton } from "../notification-button";
import { ChatVideoButton } from "../chat-video-button";
import { currentUserProfile } from "@/lib/current-profile";

export const NavigationSideBar = async (
    {userProfileIdNavigationSideBar} : {userProfileIdNavigationSideBar: string},
) => {

    //for testing only
    const profile = await currentUserProfile();
    const servers = await db.server.findMany({
        where: {
            Member:{
                some:{
                    userProfileId: userProfileIdNavigationSideBar,
                    deleted: false
                }
            },
            deleted: false,
        }
    })
    
    if(!servers)
    {
        return redirect("/meself/friend");
    }
    
    if(profile)
    {
        const notification = await db.userNotification.findMany({
            where: {
                userProfileId: profile.id
            }
        })
        const userRank = await db.userBilling.findFirst({
            where: {
                userProfileId2: profile.id
            }
        })
        
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
                    <ChatVideoButton 
                        currentUser={profile}
                        directChannelId="testing"
                        otherUserIdSocket={profile.id}
                    />
                    <NotificationButton 
                        userSocketId={userProfileIdNavigationSideBar}
                        notificationProp={notification}
                    />
                    <SocketStatusDisplay />
                    <ModeToggle />
                </div>
            </div>
            </Suspense>
    
         );
    }
   
}
 