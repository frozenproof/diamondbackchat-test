import { InitialPage } from "@/components/extra/homepage/initial-page";
import { db } from "@/lib/db";
import { initialFirstProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";

const SetupPage = async () => {
    // const newprofile = await initialFirstProfile();
    // const server = await db.server.findFirst({
    //     where: {
    //         members:{
    //             some:{
    //                 userProfileId: newprofile.id
    //             }
    //         },
    //         deleted: false
    //     }
    // })

    // if(server){
    //     // return redirect(`/servers/${server.id}`);
    //     return redirect(`/meself`)
    // }

    return (
        <InitialPage />
    )

}
 
export default SetupPage;