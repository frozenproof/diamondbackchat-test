import { redirect } from "next/navigation";

import { currentUserProfile } from "@/lib/current-profile";
import { UserButtonDiamond } from "@/components/uihelper/user-button-diamond";

import { DirectSideBar } from "@/components/display/direct/direct-sidebar";

const MePageLayout = async ({
    children,
    }:
    {
        children: React.ReactNode;
    }
) => {
    const profile = await currentUserProfile();

    if(!profile){
        return redirect(`/check-auth`);
    } 
    
    else
    {
        return ( 
            <div className="h-full">
                <div className="hidden md:flex h-full w-48 z-20 flex-col fixed inset-y-0
                    bg-[#F2F3F5] dark:bg-[#000000]
                ">
                    <DirectSideBar 
                        userProfileId={profile.id}
                    />
                    <div
                        className="mt-auto pt-1 pb-1 pl-1 flex"
                    >
                        
                        <UserButtonDiamond 
                            currentUserProfile={profile}
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
 
export default MePageLayout;