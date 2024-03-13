import { currentUserProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

export async function PATCH( 
    req: Request, 
    {params}:{params:{inviteCode: string}},
){
    try {
        const profile = await currentUserProfile();

        if(!profile) {
            throw new Error("Unauthorized personel detected.");    
        }
        
        if(!params.inviteCode){
            throw new Error(">:3 no server detected.");
        }

        console.log(params.inviteCode);

        const inviteServer = await db.serverInvite.update({
            where: {
                inviteId:{
                    serverId: params.inviteCode,
                    userProfileId: profile.id,
                }
             },
            data: {
                inviteCode: uuidv4(),
            },
        });

        //  NextResponse.json(inviteServer);
        // return NextResponse.json(server);
        return NextResponse.json(inviteServer);
    }
    catch(error) {
        console.log("[SERVERID_API_INVITE]",error);
        return new NextResponse("Internal Error Cattus",{ status: 500 });
    }
}

