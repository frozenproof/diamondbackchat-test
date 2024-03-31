import { InitialPage } from "@/components/extra/homepage/initial-page";
import { NavigationAction } from "@/components/navigation/navigation-action";
import { LoadingMainPage } from "@/components/uihelper/loading-wait";
import { db } from "@/lib/db";
import { initialFirstProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const SetupPage = async () => {
    // const newprofile = await initialFirstProfile();
    var checkExist = false;

    // if(newprofile)
    //     checkExist=true
    
    return (
        <Suspense 
            fallback={<LoadingMainPage />}
        >
            <InitialPage 
                isLoggedin={checkExist}
            />
        </Suspense>
    )

}
 
export default SetupPage;