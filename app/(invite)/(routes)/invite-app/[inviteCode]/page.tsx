import { currentUserProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface InviteCodeProps {
    params: {
        inviteCode: string;
    };
};

const InviteCodePage = async({
    params
} : InviteCodeProps   
) => {
    const profile = await currentUserProfile();

    if(!profile) {
        return redirectToSignIn();
    }

    if(!params.inviteCode) {
        return redirect("/");
    }

    const existingInServer = await db.serverInvite.findFirst({
        where: {
            inviteCode: params.inviteCode,
            deleted: false,
        }
    });

    if(existingInServer) {
        return redirect(`/servers/${existingInServer.serverId}`);
    } 

    const server = await db.server.update({
        where: {
            inviteCode: params.inviteCode,
        },
        data: {
            members: {
                create: [
                    {
                        userProfileId: profile.id,
                    }
                ]
            }
        }
    })

    if(server) {
        return redirect(`/servers/${server.id}`);
    } else return null;
}
 
export default InviteCodePage;