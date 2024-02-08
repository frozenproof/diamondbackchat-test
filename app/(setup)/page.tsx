import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { UserProfile } from "@clerk/nextjs";

const SetupPage = async () => {
    const newinitialprofile = await initialProfile();
    const servers = await db.server.findFirst({
        where: {
            members:{
                some:{
                    UserProfileId: UserProfile.
                }
            }
        }
    })
    return ( 
        <div>
            Create a server
        </div>
     );
}
 
export default SetupPage;