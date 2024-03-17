import { currentUserProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req:Request,
    {params} : { params: {serverId: string}}
) {
    try {
        const profile = await currentUserProfile();

        if(!profile) {
            throw new Error("Unauthorized ");
        }
        
        const serverInvites = await db.serverInvite.findFirst({
            where: {
                serverId: params.serverId,
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