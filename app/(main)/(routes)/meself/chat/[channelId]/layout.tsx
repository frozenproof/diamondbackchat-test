import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { ServerSideBar } from "@/components/display/server/server-sidebar";
import { currentUserProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { UserButtonDiamond } from "@/components/uihelper/user-button-diamond";
import { GlowingStarsBackgroundCard } from "@/components/effects/glowing-stars";
import { DirectSideBar } from "@/components/display/direct/direct-sidebar";


const DirectPageLayout = async ({
    children,
    }:
    {
        children: React.ReactNode;
    }
) => {
    const profile = await currentUserProfile();

    if(!profile){
        return redirect(`/check-auth/login-dbc`);
    }   
    else
    {
        // console.log(profile);
        return ( 
            <div className="h-full">
                <div className="hidden md:flex h-full w-48 z-20 flex-col fixed inset-y-0">
                    <DirectSideBar />
                    
                    <div
                        className="mt-auto pt-1 pb-1 pl-1 flex"
                    >
    
                        <UserButtonDiamond 
                            src={profile.imageUrl}
                            name={profile.name}
                            status={profile.status}
                        />
                       
                    </div>
                </div>
                <main className="h-full md:pl-48">
                    {children}    
                </main>
            </div>
         );
        }
}
 
export default DirectPageLayout;