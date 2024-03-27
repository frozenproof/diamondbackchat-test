import { InitialPage } from "@/components/extra/homepage/initial-page";
import { NavigationAction } from "@/components/navigation/navigation-action";
import { LoadingMainPage } from "@/components/uihelper/loading-wait";
import { db } from "@/lib/db";
import { initialFirstProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const SetupPage = async () => {
    const newprofile = await initialFirstProfile();
    var checkExist = false;

    if(newprofile)
        checkExist=true
    // if(newprofile)
    // const server = await db.server.findFirst({
    //     where: {
    //         Member:{
    //             some:{
    //                 userProfileId: newprofile.id
    //             }
    //         },
    //         deleted: false
    //     }
    // })

    // if(server){
    //     return redirect(`/servers/${server.id}`);
    //     // return redirect(`/meself`)
    // }

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