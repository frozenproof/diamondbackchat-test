import { FollowerPointerCard } from "@/components/effects/pagi/following-pointer";
import { Meteors } from "@/components/effects/pagi/meteors";
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
            <Meteors number={20} />
        </Suspense>
    )

}
 
export default SetupPage;