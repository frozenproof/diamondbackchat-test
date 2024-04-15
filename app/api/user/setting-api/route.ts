import { currentUserProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req:Request,
) {
    try {
        const profile = await currentUserProfile();
        const { name, imageUrl, about } = await req.json();

        if(!profile) {
            throw new Error("Unauthorized ");
        }
        
        const server = await db.userProfile.update({
            where: {
                id: profile.id
            },
            data: {
                name,
                imageUrl,
                about
            }
        })

        return NextResponse.json(server);
    }
    catch(error) {
        console.log("[USER_ID_SETTING",error);
        return new NextResponse("Internal Error ", {status: 500});
    }
}