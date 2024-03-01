import { currentUserProfile } from "@/lib/current-profile";

import { redirect } from "next/navigation";
import { db } from "@/lib/db";


import { ScrollArea } from "@/components/ui/scroll-area";
import { NavigationItem } from "@/components/navigation/navigation-item";

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
        <ScrollArea className="flex-1 w-full absolute">
                {servers.map((server) => (
                    <div key={server.id} className="mb-4">
                        <NavigationItem 
                            id={server.id}
                            name={server.name}
                            imageUrl={server.imageUrl}
                        />
                    </div>
                ))}
            </ScrollArea>
    )
}