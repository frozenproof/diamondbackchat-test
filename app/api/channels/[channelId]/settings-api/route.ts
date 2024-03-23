import { currentUserProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { OldMemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PATCH(
    req:Request,
    {params} : { params: {channelId: string}}
) {
    try {
        const profile = await currentUserProfile();
        const { name, type } = await req.json();

        if(!profile) {
            throw new Error("Unauthorized ");
        }

        const channelEdited = await db.channel.findFirstOrThrow({
            where: {
                id: params.channelId
            }
        })
        
        const server = await db.server.update({
            where: {
              id: channelEdited.serverId,
              members: {
                some: {
                  userProfileId: profile.id,
                  role: {
                    in: [OldMemberRole.ADMIN, OldMemberRole.MODERATOR,OldMemberRole.CREATOR,OldMemberRole.OWNER],
                  }
                }
              }
            },
            data: {
              channels: {
                update: {
                  where: {
                    id: params.channelId,
                  },
                  data: {
                    name,
                    type,
                  }
                }
              }
            }
          });
      
          return NextResponse.json(server);
        } catch (error) {
          console.log("[CHANNEL_ID_PATCH]", error);
          return new NextResponse("Internal Error", { status: 500 });
        }
}