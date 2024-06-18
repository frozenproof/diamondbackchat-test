import { currentUserProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
) {
    try {
        const profile = await currentUserProfile();
        const { searchParams } = new URL(req.url);
        const { memberId } = await req.json()

        const serverId = searchParams.get("serverId");

    if(!profile) {
        throw new Error("Unauthorized access to cat server >:3");
    }

    if(!serverId) {
        throw new Error("Server doesn't exist");
    }

    if(!memberId) {
        throw new Error("How did you even request this ?");
    }

    const server = await db.server.update({
        where: {
            id: serverId,
        },
        data: {
            Member: {
                update: {
                    where: {
                        id: memberId,
                        userProfileId: {
                        not: profile.id
                    },
                },
                data: {
                    deleted: true
                }
            }
            }
        },
        include: {
            Member: {
                include: {
                    userProfile: true,
                },
                orderBy: {
                    role: "asc",
                }
                },
            },
        });
        const userProfile2 = await db.member.findFirst({
            where: {
                id:memberId
            }
        })
        if(!userProfile2) {
            throw new Error("How did you even request this ?");
        }
        const server2 = await db.serverInvite.update({
            where: {
                inviteId: {
                    serverId: serverId,
                    userProfileId: userProfile2.id
                }
            },
            data: {
                deleted: true
                }
            });
    
        return NextResponse.json(server);
    } 
    catch (error) 
    {
        console.log("[MEMBER_ID_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}