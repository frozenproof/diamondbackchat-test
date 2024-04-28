import { currentUserProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req:Request,
) {
    try {
        const profile = await currentUserProfile();
        const { isRead, typeRead, noticeId } = await req.json();

        if(!profile) {
            throw new Error("Unauthorized ");
        }
        
        if(typeRead === "ALL")
        {
            db.userNotification.deleteMany({
                where: {
                    userProfileId: profile.id
                }
            }).then()
            return NextResponse.json("We are done");
        }
        if(isRead === true && typeof noticeId === "string")
        {
            
        }

        return "";
    }
    catch(error) {
        console.log("[USER_ID_SETTING",error);
        return new NextResponse("Internal Error ", {status: 500});
    }
}