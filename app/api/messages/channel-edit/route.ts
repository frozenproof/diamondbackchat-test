import { currentUserProfile } from "@/lib/current-profile";

import { db } from "@/lib/db"
import { NextApiResponseServerIo } from "@/type";
import { NextResponse } from "next/server";

export async function PATCH(req: Request,res: NextApiResponseServerIo){
    try{
        const profile = await currentUserProfile();
        const { content,id } = await req.json();
        const { searchParams } = new URL(req.url);
    
        const serverIdProp = searchParams.get("serverId");
        const channelIdProp = searchParams.get("channelId");

        if (!profile) {
          return new NextResponse("Unauthorized", { status: 401 });
        }
    
        if (!serverIdProp || !channelIdProp) {
          return new NextResponse("Server ID missing", { status: 400 });
        }
    
        console.log("This is check content",content);
        console.log("This is check file",id);
        const serverAPI = await db.server.findFirst({
          where: {
            id: serverIdProp as string,
            Member: {
              some: {
                userProfileId: profile.id
              }
            }
          },
          include: {
            Member: true,
          }
        });
    
        if(!serverAPI)
        {
          return null
        }

        const channel = await db.channel.findFirst({
          where: {
            id: channelIdProp as string,
          }
        });
    
        if (!channel) {
          return null
        }
    
        const member = serverAPI.Member.find((member) => member.userProfileId === profile.id);
    
        if (!member) {
          return null
        }
    
        const message = await db.message.upsert({
          where:{
            id:id
          },
          create: {
            content: content,
            attachment: false,
            channelId: channelIdProp as string,
            memberId: member.id,
            isReply: false
          },
          update: {
            content: content,
            edited: true
          },
          include: {
            member: true
            }
        });

        const channelKey = `chat:${channelIdProp}:messages`;
        console.log("this is channel edit",channelKey);
        // socket?.server?.emit(channelKey, message);

        return NextResponse.json(message);
      } catch (error) {
        console.log("CHANNELS_POST", error);
        return new NextResponse("Internal Error", { status: 500 });
      }
}
