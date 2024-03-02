import { InitialPrompt } from "@/components/Prompts/initial-Prompt";
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
            <InitialPrompt/>
    )

}
 
export default SetupPage;