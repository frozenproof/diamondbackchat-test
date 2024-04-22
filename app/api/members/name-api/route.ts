import { currentUserProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
) {
    try
    {
        const profile = await currentUserProfile();
        const { searchParams } = new URL(req.url);
        const { memberId,nickname2 } = await req.json();

        // console.log("Nickname",receivedForm.values.nickname);
        const serverId2 = searchParams.get("serverId");

        if(!profile) {
            throw new Error("Unauthorized access to cat server >:3");
        }
        
        if(!serverId2) {
            throw new Error("Server doesn't exist");
        }

        if(!memberId) {
            throw new Error("How did you even request this ?");
        }

        const member = await db.member.update({
            where: {
                id:memberId,
                serverId:serverId2 as string,
                userProfileId: profile.id
            },
            data: {
                nickname: nickname2
            },
        });

        return NextResponse.json(member);
    }
    catch (error)
    {
        console.log("MEMBER_MANAGE",error);
        return new NextResponse("Internal Error", {status: 500});
    }
}