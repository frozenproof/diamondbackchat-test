import { InitialModal } from "@/components/modals/initial-modal";
import { db } from "@/lib/db";
import { initialFirstProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";

const SetupPage = async () => {
    const newprofile = await initialFirstProfile();
    const server = await db.server.findFirst({
        where: {
            members:{
                some:{
                    userProfileId: newprofile.id
                }
            }
        }
    })

    if(server){
        return redirect(`/servers/${server.id}`);
    }

    return (
            <InitialModal/>
    )

}
 
export default SetupPage;