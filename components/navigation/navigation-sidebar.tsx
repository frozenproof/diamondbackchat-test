import { currentUserProfile } from "@/lib/current-profile";

import { redirect } from "next/navigation";
import { NavigationAction } from "@/components/navigation/navigation-action";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/uihelper/mode-toggle";
import { UserButton } from "@clerk/nextjs";
import { NavigationServerScroll } from "@/components/navigation/navigation-server-scroll";
import { EvervaultCardVer2 } from "@/components/effects/EvervaultCardVer2";
import { GlowingStarsBackgroundCard } from "@/components/effects/glowing-stars";
import { UserButtonDiamond } from "../uihelper/user-button-diamond";

import { ScrollArea } from "../ui/scroll-area";

import { db } from "@/lib/db"
import { NavigationItem } from "./navigation-item";

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
                    userProfileId: profile.id,
                }
            },
            deleted: false,
        }
    })

    return ( 
        <div className="space-y-4 flex flex-col items-center h-full text-primary w-full absolute"
            // style={{backgroundColor: '#00000000'}}
        >
            <div className="mt-[16px] mb-auto">
                <NavigationAction/>            
            </div>
            <Separator
                className=" bg-zinc-300 dark:bg-slate-700 rounded-md mx-auto"
            />          

            
            <NavigationServerScroll/>
            <div className="pb-3 mb-auto flex items-center flex-col gap-y-4">
        
                <ModeToggle />
                {/* <UserButton 
                    afterSignOutUrl="login-dbc?"
                    appearance={{
                        elements:{
                            avatarBox: "h-[48px] w-[48px]"
                        }
                    }}
                /> */}
                {/* <UserButtonDiamond 
                    className="h-[48px] w-[48px]"
                    src={profile.imageUrl}
                /> */}
                
            </div>
        </div>
     );
}
 