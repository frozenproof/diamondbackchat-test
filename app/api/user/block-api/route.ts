import { currentUserProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req:Request,
) {
    try {
        const profile = await currentUserProfile();
        const { userProfileId } = await req.json();

        if(!profile) {
            throw new Error("Unauthorized ");
        }
        
        const server = await db.block.upsert({
            where: {
                blockId: {
                    blockerId: profile.id,
                    blockedId: userProfileId
                }                
            },
            update: {
                blockerId: profile.id,
                blockedId: userProfileId
            },
            create: {
                blockerId: profile.id,
                blockedId: userProfileId                 
            }
        })

        return NextResponse.json(server);
    }
    catch(error) {
        console.log("[USER_ID_SETTING",error);
        return new NextResponse("Internal Error ", {status: 500});
    }
}