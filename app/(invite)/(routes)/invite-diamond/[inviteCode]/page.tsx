import { currentUserProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";


interface InviteCodeProps {
    params: {
        inviteCode: string;
    };
};

const InviteCodePageDiamond = async({
    params
} : InviteCodeProps   
) => {
    try{
        const profile = await currentUserProfile();

        if(!profile) {
            return redirectToSignIn();
        }
    
        if(!params.inviteCode) {
            return redirect("/");
        }
    
        const existingInServer = await db.server.findFirst({
            where: {
                inviteCode: params.inviteCode,
                members: {
                    some: {
                        userProfileId: profile?.id,
                    }
                },
            }
        });
    
        if(existingInServer) {
            return redirect(`/servers/${existingInServer.id}`);
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

            const inviteServer = await db.serverInvite.upsert({
                where: {
                  inviteId: {
                    userProfileId: profile.id,
                    serverId: server.id,
                  },
                },
                update: {
                    inviteCode: uuidv4(),
                },
                create: {
                    userProfileId: profile.id,
                    serverId: server.id,
                    inviteCode: uuidv4(),
                    assignedBy: profile.name
                },
              })
    
            return redirect(`/servers/${server.id}`);
        } 
            
        
        return null;
     
    }
   catch (error)
   {
    console.log(error);
    return new NextResponse("Internal Error",{ status: 500});
   }
}
 
export default InviteCodePageDiamond;