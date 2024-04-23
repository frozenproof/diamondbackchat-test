import { currentUserProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { OldMemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PATCH(
    req:Request,
) {
    try {
        const profile = await currentUserProfile();
        const { name, type, channelId } = await req.json();
        const { searchParams } = new URL(req.url);
    
        const serverIdParam = searchParams.get("serverId");

        if(!profile) {
            throw new Error("Unauthorized ");
        }

        if(!serverIdParam)  {
          throw new Error("Unauthorized ");
        }


         const serverCheckAuth = await db.server.findFirstOrThrow({
            where: {
              id: serverIdParam,
              Member: {
                some: {
                  userProfileId: profile.id,
                  role: {
                    in: [OldMemberRole.ADMIN, OldMemberRole.MODERATOR,OldMemberRole.CREATOR,OldMemberRole.OWNER],
                  }
                }
              }
            }
        })

        if(!serverCheckAuth)
        {
          throw new Error("Unauthorized ");
        }
        
        const channel2 = await db.channel.findFirst({
          where: {
            id: channelId,
            serverId: serverCheckAuth.id,
            deleted: false
          },
        })

        if(channel2)
        {
          const channel = await db.channel.update({
            where: {
              id: channel2.id,
              version: channel2.version
            },
            data: {
              name,
              type,
            },
          });
          
          return NextResponse.json(channel);
        }
        
        return "how did you even get here ?";
        } catch (error) {
          console.log("[CHANNEL_ID_EDIT_PATCH]", error);
          return new NextResponse("Internal Error", { status: 500 });
        }
}