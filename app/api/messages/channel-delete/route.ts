"use server"

import { currentUserProfile } from "@/lib/current-profile";

import { db } from "@/lib/db"
import { NextApiResponseServerIo } from "@/type";
import { NextResponse } from "next/server";

export async function PATCH(req: Request,res: NextApiResponseServerIo){
    try{
        const profile = await currentUserProfile();
        const { messageId } = await req.json();
        const { searchParams } = new URL(req.url);
    
        console.log("searchParams",req.url);
        const serverIdProp = searchParams.get("serverId");
        const channelIdProp = searchParams.get("channelId");

        if (!profile) {
          return new NextResponse("Unauthorized", { status: 401 });
        }
    
        if (!serverIdProp || !channelIdProp) {
          return new NextResponse("Server ID missing", { status: 400 });
        }
    
        if (!messageId)
        {
          return new NextResponse("Message ID missing", { status: 400 });
        }
        console.log("This is check file",messageId);
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
    
        const message = await db.message.delete({
          where:{
            id:messageId
          }
        });

        // const message = await db.message.update({
        //   where:{
        //     id:messageId
        //   },
        //   data: {
        //     edited: true,
        //     deleted: true
        //   },
        // });
        const channelKey = `chat:${channelIdProp}:messages`;
        console.log("this is channel delete",channelKey);
        // socket?.server?.emit(channelKey, message);

        return NextResponse.json(message);
      } catch (error) {
        console.log("MESSAGE_DELETE", error);
        return new NextResponse("Internal Error", { status: 500 });
      }
}
