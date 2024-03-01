import { currentUserProfile } from "@/lib/current-profile";

import { redirect } from "next/navigation";
import { NavigationAction } from "@/components/navigation/navigation-action";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/uihelper/mode-toggle";
import { UserButton } from "@clerk/nextjs";
import { NavigationServerScroll } from "./navigation-server-scroll";

export const NavigationSidebar = async () => {
    const profile = await currentUserProfile();

    if(!profile)
    {
        return redirect("/");
    }

    return ( 
        <div className="space-y-4 flex flex-col items-center h-full text-primary w-full absolute"
            style={{backgroundColor: '#00000000'}}
        >
            {/* bg-[#84cfec] dark:bg-orange-400 */}
        
            <NavigationAction/>
            <Separator
                className="h-[2px] bg-zinc-300 dark:bg-slate-700 rounded-md w-10 mx-auto"
            />
            <NavigationServerScroll />
            
            <div className="pb-3 mb-auto mt-auto flex items-center flex-col gap-y-4">
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
 