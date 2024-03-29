import { NavigationSideBar } from "@/components/navigation/navigation-sidebar";
import { LoadingMainPage } from "@/components/uihelper/loading-wait";
import React, { Suspense } from "react";

var MainLayout = async ({
    children
}:{
    children: React.ReactNode;
}) => {
    return ( 
        <Suspense
            fallback={<LoadingMainPage />}
        >
            <div className="h-full mainapp">
                <div className="hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0"> 
                <NavigationSideBar/>             
                </div>
                <main className="md:pl-[72px] h-full insidemain">
                    {children}
                </main>
            </div>
       </Suspense>
     );
}
 
export default MainLayout;