import { currentUserProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { memberId: string } }
) {
    try {
        const profile = await currentUserProfile();
        const { searchParams } = new URL(req.url);

        const serverId = searchParams.get("serverId");

    if(!profile) {
        throw new Error("Unauthorized access to cat server >:3");
    }

    if(!serverId) {
        throw new Error("Server doesn't exist");
    }

    if(!params.memberId) {
        throw new Error("How did you even request this ?");
    }

    const server = await db.server.update({
        where: {
            id: serverId,
            userProfileId: profile.id,
        },
        data: {
            members: {
            deleteMany: {
                id: params.memberId,
                userProfileId: {
                not: profile.id
                }
            }
            }
        },
        include: {
            members: {
                include: {
                    userProfile: true,
                },
                orderBy: {
                    role: "asc",
                }
                },
            },
        });

        return NextResponse.json(server);
    } 
    catch (error) 
    {
        console.log("[MEMBER_ID_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}