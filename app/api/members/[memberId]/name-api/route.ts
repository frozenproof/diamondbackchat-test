import { currentUserProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { memberId: string}}
) {
    try
    {
        const profile = await currentUserProfile();
        const { searchParams } = new URL(req.url);
        const receivedForm = await req.json();
        const  nickname2  = receivedForm.values.nickname;

        // console.log("Nickname",receivedForm.values.nickname);
        const serverId2 = searchParams.get("serverId");

        if(!profile) {
            throw new Error("Unauthorized access to cat server >:3");
        }
        
        if(!serverId2) {
            throw new Error("Server doesn't exist");
        }

        if(!params.memberId) {
            throw new Error("How did you even request this ?");
        }

        const member = await db.member.update({
            where: {
                id:params.memberId,
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