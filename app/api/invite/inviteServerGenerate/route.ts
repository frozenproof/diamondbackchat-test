import { currentUserProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

export async function PATCH( 
    req: Request, 
){
    try {
        const profile = await currentUserProfile();
        const { serverId } = await req.json();
        
        if(!profile) {
            throw new Error("Unauthorized personel detected.");    
        }
        
        if(!serverId){
            throw new Error(">:3 no server detected.");
        }

        const serverInvite = await db.serverInvite.update({
            where: {
                inviteId: {
                    serverId: serverId,
                    userProfileId: profile.id,
                }
            },
            data: {
                inviteCode: uuidv4(),
            },
        });

        return NextResponse.json(serverInvite);
    }
    catch(error) {
        console.log("[INVITECODE_API_INVITE]",error);
        return new NextResponse("Internal Error Cattus",{ status: 500 });
    }
}

