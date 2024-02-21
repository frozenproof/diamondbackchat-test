import { currentUserProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

import { redirect } from "next/navigation";
import { NavigationAction } from "@/components/navigation/navigation-action";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavigationItem } from "@/components/navigation/navigation-item";
import { ModeToggle } from "@/components/uihelper/mode-toggle";
import { UserButton } from "@clerk/nextjs";

export const NavigationSidebar = async () => {
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
        <div className="space-y-4 flex flex-col items-center h-full text-primary w-full bg-[#84cfec] dark:bg-orange-400">
            <NavigationAction/>
            <Separator
                className="h-[2px] bg-zinc-300 dark:bg-slate-700 rounded-md w-10 mx-auto"
            />
            <ScrollArea className="flex-1 w-full">
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
            <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
                <ModeToggle />
                <UserButton 
                    afterSignOutUrl="/"
                    appearance={{
                        elements:{
                            avatarBox: "h-[48px] w-[48px]"
                        }
                    }}
                />

            </div>
        </div>
     );
}
 