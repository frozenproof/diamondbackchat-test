import { currentUserProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req:Request,
) {
    try {
        const profile = await currentUserProfile();
        const { serverId } = await req.json();
        if(!profile) {
            throw new Error("Unauthorized ");
        }
        if(!serverId){
            throw new Error(">:3 no server detected.");
        }

        
        const serverInvites = await db.serverInvite.findFirst({
            where: {
                serverId: serverId,
                userProfileId: profile.id
            }
        })

        return NextResponse.json(serverInvites);
    }
    catch(error) {
        console.log("[SERVER_ID_SEARCH",error);
        return new NextResponse("Internal Error ", {status: 500});
    }
}