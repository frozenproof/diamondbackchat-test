import { currentUserProfile } from "@/lib/current-profile";
import { v4 as uuidv4 } from "uuid"
import { db } from "@/lib/db"
import { NextResponse } from "next/server";
import { OldChannelType, OldMemberRole } from "@prisma/client";

export async function POST(req: Request){
    try{
        const profile = await currentUserProfile();
        const { name, type } = await req.json();
        const { searchParams } = new URL(req.url);
    
        const serverId = searchParams.get("serverId");
    
        if (!profile) {
          return new NextResponse("Unauthorized", { status: 401 });
        }
    
        if (!serverId) {
          return new NextResponse("Server ID missing", { status: 400 });
        }
    

        const server = await db.server.findFirstOrThrow({
          where: {
            id: serverId,
            Member: {
              some: {
                userProfileId: profile.id,
                role: {
                  in: [OldMemberRole.ADMIN, OldMemberRole.MODERATOR,OldMemberRole.CREATOR,OldMemberRole.LILWITCH,OldMemberRole.OWNER]
                }
              }
            }
          }
        });
    
        const defaultChannel = await db.channel.create({
          data: {
              name: name,
              type: type,
          }
        })

        const defaultChannelServer = await db.serverChannel.create({
            data: {
                serverId: server.id,
                channelId: defaultChannel.id
            }
        })

        return NextResponse.json(defaultChannelServer);
      } catch (error) {
        console.log("CHANNELS_POST", error);
        return new NextResponse("Internal Error", { status: 500 });
      }
}
