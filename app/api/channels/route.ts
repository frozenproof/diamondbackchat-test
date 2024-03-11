import { currentUserProfile } from "@/lib/current-profile";
import { v4 as uuidv4 } from "uuid"
import { db } from "@/lib/db"
import { NextResponse } from "next/server";
import { OldMemberRole } from "@prisma/client";

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
    
        if (name === "general") {
          return new NextResponse("Name cannot be 'general'", { status: 400 });
        }
    
        const server = await db.server.update({
          where: {
            id: serverId,
            members: {
              some: {
                userProfileId: profile.id,
                role: {
                  in: [OldMemberRole.ADMIN, OldMemberRole.MODERATOR]
                }
              }
            }
          },
          data: {
            channels: {
              create: {
                userProfileId: profile.id,
                name,
                type,
              }
            }
          }
        });
    
        return NextResponse.json(server);
      } catch (error) {
        console.log("CHANNELS_POST", error);
        return new NextResponse("Internal Error", { status: 500 });
      }
}
