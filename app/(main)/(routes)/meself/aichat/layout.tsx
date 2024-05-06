import { NavigationSideBar } from "@/components/navigation/navigation-sidebar";
import { LoadingMainPage } from "@/components/uihelper/loading-wait";
import { currentUserProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { Suspense } from "react";

var MainLayout = async ({
    children
}:{
    children: React.ReactNode;
}) => {
    const currentSystem = await db.maintainence.findFirst()
    if(currentSystem && currentSystem.isOffline)
    {
        return (
            <div
                className="text-center"
            >
                <div>
                    This message is from developers .
                </div>
                (　･ω･)☞	We are currently doing maintainence.       
                <br />
                From {currentSystem.from.toDateString()} until {currentSystem.until.toDateString()} the maintainence will be performed.        
            </div>    
        )
    }

    const profile = await currentUserProfile();
    if(!profile)
    {
        return redirect(`/`);
    }
    if(profile)
    return ( 
        <Suspense
            fallback={<LoadingMainPage />}
        >
            <div className="h-full mainapp">
                <div className="hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0"> 
                <NavigationSideBar
                    userProfileIdNavigationSideBar={profile.id}
                />             
                </div>
                <main className="md:pl-[72px] h-full insidemain">
                    {children}
                </main>
            </div>
       </Suspense>
     );
}
 
export default MainLayout;