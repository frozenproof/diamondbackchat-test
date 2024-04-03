"use server"

import { redirect } from "next/navigation";
import { db } from "@/lib/db";


import { NavigationItem } from "@/components/navigation/navigation-item";
import { EvervaultCardVer2 } from "../effects/evervault/EvervaultCardVer2";

export const NavigationServerScroll = async(
   {userProfileIdNavigationServerScroll }:{userProfileIdNavigationServerScroll: string}, 
) => {
    // const profile = await currentUserProfile();

    // if(!profile)
    // {
    //     return redirect("/");
    // }

    //bug vo han xay ra khi render doi tuong co chua ham async vi no render truoc khi item san sang , ke ca khi suspense duoc kich hoat

    const servers = await db.server.findMany({
        where: {
            Member:{
                some:{
                    userProfileId: userProfileIdNavigationServerScroll,
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
            // <ScrollArea className="w-3/5 flex flex-col gap-y-4 overflow-y-auto">
            <div className="flex flex-col gap-y-4 overflow-y-auto serverscroll h-full">
                {servers.map((server) => (
                            <EvervaultCardVer2 className="" key={server.id}>                
                                <div key={server.id} className="mt-[12px] mb-[12px]">
                                    <NavigationItem 
                                        id={server.id}
                                        name={server.name}
                                        imageUrl={server.imageUrl}
                                    />
                                </div>
                            </EvervaultCardVer2>
                        ))}
            </div>
    )
}