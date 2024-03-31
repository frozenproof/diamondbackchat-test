import { currentUserProfile } from "@/lib/current-profile";

import { redirect } from "next/navigation";
import { NavigationAction } from "@/components/navigation/navigation-action";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/uihelper/mode-toggle";

import { NavigationServerScroll } from "@/components/navigation/navigation-server-scroll";

import { db } from "@/lib/db"

import { NavigationSelf } from "./navigation-self";
import { SocketStatusDisplay } from "../socket/socket-status-display";
import { ScrollArea } from "../ui/scroll-area";
import { EvervaultCardVer2 } from "../effects/evervault/EvervaultCardVer2";
import { NavigationItem } from "./navigation-item";

export const NavigationSideBar = async () => {
    const profile = await currentUserProfile();

    if(!profile)
    {
        return redirect("/");
    }

    return ( 
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

            {/* <div
                className="h-full"
            > */}
                <NavigationServerScroll/>
            {/* </div> */}
            <div className="pb-3 mb-auto flex items-center flex-col gap-y-4">
            <SocketStatusDisplay />
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
 