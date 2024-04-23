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

        const serverVersion = await db.server.findFirst({
            where: {
                id: serverId,
            },
            select: {
                version: true,
            }
        })
        
        if(serverVersion)
        {
            try {
                const server = await db.server.update({
                    where: {
                        id: serverId,
                        userProfileId: profile.id,
                        version: serverVersion.version
                    },
                    data: {
                        name,
                        imageUrl
                    }
                })
                return NextResponse.json(server);
            }
            catch {
                return new NextResponse("Server version was updated during run time");
            }
        }
        if(!serverVersion)
        {
            return new NextResponse("No server detected during run time");
        }
    }
    catch(error) {
        console.log("[SERVER_ID_SETTING",error);
        return new NextResponse("Internal Error ", {status: 500});
    }
}