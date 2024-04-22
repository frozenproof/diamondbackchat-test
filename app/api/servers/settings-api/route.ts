import { currentUserProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req:Request,
) {
    try {
        const profile = await currentUserProfile();
        const { name, imageUrl, serverId } = await req.json();

        if(!profile) {
            throw new Error("Unauthorized ");
        }
        
        const server = await db.server.update({
            where: {
                id: serverId,
                userProfileId: profile.id
            },
            data: {
                name,
                imageUrl
            }
        })

        return NextResponse.json(server);
    }
    catch(error) {
        console.log("[SERVER_ID_SETTING",error);
        return new NextResponse("Internal Error ", {status: 500});
    }
}