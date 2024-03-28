import { currentUserProfile } from "@/lib/current-profile";
import { v4 as uuidv4 } from "uuid"
import { db } from "@/lib/db"
import { NextResponse } from "next/server";
import { OldChannelType, OldMemberRole } from "@prisma/client";

export async function POST(req: Request){
    try{
        const {name,imageUrl} = await req.json();
        const profile = await currentUserProfile();
        if(!profile){
            return new NextResponse("Unauthorized", {status: 401})
        }

        const server2 = await db.server.create({
            data:{
                userProfileId: profile.id,
                name,
                imageUrl,
                Member:{
                    create:[
                    {
                        userProfileId: profile.id,
                        role: OldMemberRole.OWNER,
                        nickname: profile.name + " member "
                    }
                ]
                }
            }
        })
        
        const defaultChannel = await db.channel.create({
            data: {
                name: "general",
                type: OldChannelType.TEXT,
                categories: "",
                serverId: server2.id
            }
        })

        // const defaultChannelServer = await db.serverChannel.create({
        //     data: {
        //         serverId: server2.id,
        //         channelId: defaultChannel.id
        //     }
        // })
        
        const inviteServer = await db.serverInvite.upsert({
            where: {
              inviteId: {
                userProfileId: profile.id,
                serverId: server2.id,
              },
            },
            update: {
              inviteCode: uuidv4(),
            },
            create: {
              inviteCode:uuidv4(),
              userProfileId: profile.id,
              serverId: server2.id,
            },
          })

        return NextResponse.json(server2);
    }
    catch(error){
        console.log("[SERVERS_POST]", error);
        return new NextResponse("Internal Error", {status: 500})
    }
}
