import { currentUserProfile } from "@/lib/current-profile";

import { redirect } from "next/navigation";
import { db } from "@/lib/db";


import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { NavigationItem } from "@/components/navigation/navigation-item";
import { EvervaultCardVer2 } from "../effects/EvervaultCardVer2";

export const NavigationServerScroll = async() => {
    const profile = await currentUserProfile();

    if(!profile)
    {
        return redirect("/");
    }

    const servers = await db.server.findMany({
        where: {
            members:{
                some:{
                    userProfileId: profile.id
                }
            }
        }
    })
    return (
            <ScrollArea className="h-full w-full ">
                    {servers.map((server) => (
                        <EvervaultCardVer2 className="h-full" key={server.id}>                
                            <div key={server.id} className="mt-[12px] mb-[12px]">
                                <NavigationItem 
                                    id={server.id}
                                    name={server.name}
                                    imageUrl={server.imageUrl}
                                />
                            </div>
                        </EvervaultCardVer2>
                    ))}
                {/* <ScrollBar orientation="vertical" />        */}
            </ScrollArea>
    )
}