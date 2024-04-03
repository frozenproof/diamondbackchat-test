"use server"

import { NavigationSideBar } from "@/components/navigation/navigation-sidebar";
import { LoadingMainPage } from "@/components/uihelper/loading-wait";
import { currentUserProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";

var MainLayout = async ({
    children
}:{
    children: React.ReactNode;
}) => {
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