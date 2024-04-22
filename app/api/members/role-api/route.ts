import { currentUserProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { OldMemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
) {
    try
    {
        const profile = await currentUserProfile();
        const { searchParams } = new URL(req.url);
        const { memberId,role } = await req.json();

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
                id:serverId,
            },
            data: {
                Member: {
                    update: {
                        where: {
                          id: memberId,
                          userProfileId: {
                            not: profile.id
                          },
                          role: {
                            in: [OldMemberRole.MODERATOR,OldMemberRole.OWNER,OldMemberRole.CREATOR,OldMemberRole.LILWITCH,OldMemberRole.ADMIN]
                          }
                        },
                        data: {
                          role
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
                        role: "asc"
                    }
                }
            }
        });

        return NextResponse.json(server);
    }
    catch (error)
    {
        console.log("MEMBER_MANAGE",error);
        return new NextResponse("Internal Error", {status: 500});
    }
}