import { currentUserProfile } from "@/lib/current-profile";

import { db } from "@/lib/db"

import { NextResponse } from "next/server";

export async function PATCH(req: Request){
    try{
        const profile = await currentUserProfile();
        const { content,id } = await req.json();
        const { searchParams } = new URL(req.url);
    
        const channelIdProp = searchParams.get("channelId");

        if (!profile) {
          return new NextResponse("Unauthorized", { status: 401 });
        }
    
        if (!channelIdProp) {
          return new NextResponse("Server ID missing", { status: 400 });
        }
    
        console.log("This is check content",content);
        console.log("This is check file",id);


        const channel = await db.directChannel.findFirst({
          where: {
            id: channelIdProp as string,
            OR: [
              {memberOneId: profile.id},
              {memberTwoId: profile.id}
            ]
          }
        });
    
        if (!channel) {
          return null
        }
    
   
        const message = await db.directMessage.upsert({
          where:{
            id:id,
            directChannelId: channel.id
          },
          create: {
            content: content,
            hasAttachment: false,
            directChannelId: channelIdProp as string,
            userProfileId: profile.id,
            isReply: false
          },
          update: {
            content: content,
            edited: true
          },
          include: {
            userProfile: true
            }
        });

        const channelKey = `chat:${channelIdProp}:messages`;
        console.log("this is direct channel edit",channelKey);
        // socket?.server?.emit(channelKey, message);

        return NextResponse.json(message);
      } catch (error) {
        console.log("CHANNELS_POST", error);
        return new NextResponse("Internal Error", { status: 500 });
      }
}
