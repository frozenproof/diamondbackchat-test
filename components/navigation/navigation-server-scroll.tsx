import { currentUserProfile } from "@/lib/current-profile";

import { redirect } from "next/navigation";
import { db } from "@/lib/db";


import { ScrollArea } from "@/components/ui/scroll-area";
import { NavigationItem } from "@/components/navigation/navigation-item";
import { EvervaultCardVer2 } from "../effects/evervault/EvervaultCardVer2";

export const NavigationServerScroll = async() => {
    const profile = await currentUserProfile();

    if(!profile)
    {
        return redirect("/");
    }

    const servers = await db.server.findMany({
        where: {
            Member:{
                some:{
                    userProfileId: profile.id,
                }
            },
            deleted: false,
        }
    })
    
    if(!servers)
    {
        return redirect("/meself");
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