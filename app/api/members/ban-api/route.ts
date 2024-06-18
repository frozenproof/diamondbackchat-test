import { currentUserProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
) {
    try {
        const profile = await currentUserProfile();
        const { searchParams } = new URL(req.url);
        const { banStatus,userProfileId } = await req.json();
        const serverId = searchParams.get("serverId");

    if(!profile) {
        throw new Error("Unauthorized access to cat server >:3");
    }

    if(!serverId) {
        throw new Error("Server doesn't exist");
    }

    if(!userProfileId) {
        throw new Error("How did you even request this ?");
    }

    const server = await db.server.findFirst({
        where: {
            id: serverId,
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

        if(server)
        {
            const finalBan = (banStatus === "yes")
            const deleteMember = await db.member.update({
                where: {
                    MemberUSID: {
                        userProfileId: userProfileId as string,serverId: serverId
                    },
                    userProfileId: {
                        not: profile.id
                    }
                },
                data: {
                    deleted: finalBan ? true : false
                }
            })

            if(finalBan)
            {
                const banMember = await db.bannedServerMember.create(
                    {
                        data: {
                            assignedBy: profile.id,
                            count: 1,
                            serverId: server.id,
                            userProfileId: deleteMember.userProfileId,
                        }
                    }
                )
            }
            else if(!finalBan)
            {
                const banMember = await db.bannedServerMember.deleteMany(
                    {
                        where: {
                            serverId: server.id,
                            userProfileId: deleteMember.userProfileId,
                        }
                    }
                )
            }

            const server2 = await db.serverInvite.update({
                where: {
                    inviteId: {
                        serverId: serverId,
                        userProfileId: userProfileId as string
                    }
                },
                data: {
                    deleted: finalBan
                    }
                });
        
            return NextResponse.json(server);
        }
      
    } 
    catch (error) 
    {
        console.log("[MEMBER_ID_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}