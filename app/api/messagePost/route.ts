

import { NextApiResponseServerIo } from "@/type";
import { currentProfilePages } from "@/lib/current-profile-pages";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { currentUserProfile } from "@/lib/current-profile";



export async function POST(  
  // req: NextApiRequest,
  req: Request,
  res: NextApiResponseServerIo){
  try{
    // console.log(req);
    const profile = await currentUserProfile();
    const temp  = req.body;

    const { searchParams } = new URL(req.url);
    
    const serverId = searchParams.get("serverId");
    const channelId = searchParams.get("channelId");
    console.log(temp);
    console.log(serverId);
    // const {  channelId } = req.query;
    
    if (!profile) {
      return res.status(401).json({ error: "Unauthorized" });
    }    
  
    if (!serverId) {
      return res.status(400).json({ error: "Server ID missing" });
    }
      
    if (!channelId) {
      return res.status(400).json({ error: "Channel ID missing" });
    }
          
    // if (!content) {
    //   return res.status(400).json({ error: "Content missing" });
    // }

    const server = await db.server.findFirst({
      where: {
        id: serverId as string,
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

    if (!server) {
      return res.status(404).json({ message: "Server not found" });
    }

    const channel = await db.channel.findFirst({
      where: {
        id: channelId as string,
      }
    });

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    const member = server.Member.find((member) => member.userProfileId === profile.id);

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    const message = await db.message.create({
      data: {
        userProfileId:profile.id,
        content: "testing this",
        attachment: false,
        channelId: channelId as string,
      }
    });

    const channelKey = `chat:${channelId}:messages`;

    res?.socket?.server?.io?.emit(channelKey, message);

    // return res.status(200).json(message);
    return new NextResponse("Running Error", { status: 200 });
  } catch (error) {
    console.log("[MESSAGES_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
  }