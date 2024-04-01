import { currentUserProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
    req: Request,
    { params }: { params: { channelId: string } }
  ) {
    try {
      const profile = await currentUserProfile();
  
      if (!profile) {
        throw new Error("Unauthorized");
      }
  
      // const server = await db.server.delete({
      //   where: {
      //     id: params.serverId,
      //     userProfileId: profile.id,
      //   }
      // });
      const channel = await db.channel.updateMany({
        where: {
          id: params.channelId,
        },
        data: {
          deleted: true
        }
      });
  
      return NextResponse.json(channel);
    } catch (error) {
      console.log("[SERVER_ID_DELETE]", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }