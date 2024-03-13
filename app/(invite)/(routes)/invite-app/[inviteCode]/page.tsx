import { currentUserProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";


interface InviteCodeProps {
    params: {
        inviteCode: string;
    };
};

const InviteCodePage = async({
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
    
        const existingInServerInvite = await db.serverInvite.findFirst({
            where: {
                inviteCode: params.inviteCode,
                deleted: false,
            }
        });
    
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
        } else
        {
            const server2 = await db.server.update({
                where: {
                    id: existingInServerInvite?.serverId,
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
            
            if(server2) {
                return redirect(`/servers/${server2.id}`);
            } 
    
            else return null;
        }
     
    }
   catch (error)
   {
    console.log(error);
    return new NextResponse("Internal Error",{ status: 500});
   }
}
 
export default InviteCodePage;