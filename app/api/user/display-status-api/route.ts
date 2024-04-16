import { currentUserProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req:Request,
) {
    try {
        const profile = await currentUserProfile();
        const { status } = await req.json();

        console.log("user status api",status)
        if(!profile) {
            throw new Error("Unauthorized ");
        }
        
        const user = await db.userProfile.update({
            where: {
                id: profile.id
            },
            data: {
                status
            }
        })

        return NextResponse.json(user);
    }
    catch(error) {
        console.log("[USER_ID_SETTING",error);
        return new NextResponse("Internal Error ", {status: 500});
    }
}