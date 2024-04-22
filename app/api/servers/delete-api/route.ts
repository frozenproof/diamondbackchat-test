import { currentUserProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
    req: Request,
  ) {
    try {
      const profile = await currentUserProfile();
      const { serverId } = await req.json();
      if (!profile) {
        throw new Error("Unauthorized");
      }
  
      // const server = await db.server.delete({
      //   where: {
      //     id: params.serverId,
      //     userProfileId: profile.id,
      //   }
      // });
      const server = await db.server.updateMany({
        where: {
          id: serverId,
          userProfileId: profile.id,
        },
        data: {
          deleted: true
        }
      });
  
      return NextResponse.json(server);
    } catch (error) {
      console.log("[SERVER_ID_DELETE]", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }