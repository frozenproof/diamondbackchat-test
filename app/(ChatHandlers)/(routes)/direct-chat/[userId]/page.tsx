import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { currentUserProfile } from "@/lib/current-profile";
import { isRedirectError } from "next/dist/client/components/redirect";
import { v4 as uuidv4 } from "uuid";

interface DirectChatHandlerProps {
  params: {
    inviteCode: string;
  };
};

const DirectChatHandler = async ({
  params
}: DirectChatHandlerProps) => {
  try {
    const profile = await currentUserProfile();

    if (!profile) {
      return redirectToSignIn();
    }
  
    if (!params.inviteCode) {
      return redirect("/");
    }
  
    const findServerId = await db.serverInvite.findFirst(
      {
        where: {
          inviteCode: params.inviteCode,
        }
      }
    )

    if (!findServerId) {
      return redirect("/");
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
 
export default DirectChatHandler;