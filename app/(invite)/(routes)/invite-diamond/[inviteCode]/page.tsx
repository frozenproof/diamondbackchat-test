import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { currentUserProfile } from "@/lib/current-profile";
import { isRedirectError } from "next/dist/client/components/redirect";

interface InviteCodePagePropsDiamond {
  params: {
    inviteCode: string;
  };
};

const InviteCodePageDiamond = async ({
  params
}: InviteCodePagePropsDiamond) => {
  try {
    const profile = await currentUserProfile();

    if (!profile) {
      return redirectToSignIn();
    }
  
    if (!params.inviteCode) {
      return redirect("/");
    }
  
    const serverFind = await db.serverInvite.findFirst(
      {
        where: {
          inviteCode: params.inviteCode,
        }
      }
    )

    if (!serverFind) {
      return redirect("/");
    }

    const existingServer = await db.server.findFirst({
      where: {
        id: serverFind.serverId,
        members: {
          some: {
            userProfileId: profile.id
          }
        }
      }
    });
  
    if (existingServer) {
      return redirect(`/servers/${existingServer.id}`);
    }
  
    const server = await db.server.update({
      where: {
        inviteCode: params.inviteCode,
      },
      data: {
        members: {
          create: [
            {
              userProfileId: profile.id,
            }
          ]
        }
      }
    });
  
    if (server) {
      // const inviteServer = await db.serverInvite.upsert(
      //   {

      //   }
      // )
      return redirect(`/servers/${server.id}`);
    }
    
    return null;
  }
  catch (error)
  {
    if (isRedirectError(error)) {
      throw error;
    }    
    console.log("Unknown error",error);
  }
}
 
export default InviteCodePageDiamond;