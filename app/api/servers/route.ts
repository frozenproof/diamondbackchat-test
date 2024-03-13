import { currentUserProfile } from "@/lib/current-profile";
import { v4 as uuidv4 } from "uuid"
import { db } from "@/lib/db"
import { NextResponse } from "next/server";
import { OldMemberRole } from "@prisma/client";

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
                inviteCode: uuidv4(),
                channels:{
                    create:[
                    {
                        name: "general cattus",
                        userProfileId: profile.id
                    }
                ]
                },
                members:{
                    create:[
                    {
                        userProfileId: profile.id,
                        role: OldMemberRole.OWNER
                    }
                ]
                }
            }
        })
        
        const inviteServer = await db.serverInvite.upsert({
            where: {
              inviteId: {
                userProfileId: profile.id,
                serverId: server2.id,
              },
            },
            update: {
              inviteCode: server2.inviteCode,
            },
            create: {
              inviteCode:server2.inviteCode,
              userProfileId: profile.id,
              serverId: server2.id,
              assignedBy: profile.userId
            },
          })

        
        return NextResponse.json(server2);
    }
    catch(error){
        console.log("[SERVERS_POST]", error);
        return new NextResponse("Internal Error", {status: 500})
    }
}
