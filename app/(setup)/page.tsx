"use server"

import { Meteors } from "@/components/effects/pagi/meteors";
import { InitialPage } from "@/components/extra/homepage/initial-page";

import { LoadingMainPage } from "@/components/uihelper/loading-wait";

import { initialFirstProfile } from "@/lib/initial-profile";

import { Suspense } from "react";

const SetupPage = async () => {
    const newprofile = await initialFirstProfile();
    var checkExist = false;

    if(newprofile)
        checkExist=true
    
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