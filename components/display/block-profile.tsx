"use client"

import { usePrompt } from "@/hooks/use-prompt-store";
import { UserProfileAvatar } from "../uihelper/user-profile-avatar";
import { BlockWithProfile } from "@/type";
import { CircleSlash2Icon, Cross } from "lucide-react";
import { useRouter } from "next/navigation";
import qs from "query-string"
import axios from "axios";

interface FriendProfileComponentInterface {
    pageFriendsProp: BlockWithProfile[];
    profileId: string;
}

const FriendProfileComponent = (
    { 
        pageFriendsProp,
        profileId
    } : FriendProfileComponentInterface
) => {
    const {onOpen} = usePrompt();
    const router = useRouter();

    const onUnblockChange = async(otherUserId: string) => {
      try {
          const url = qs.stringifyUrl({
              url: `/api/friend/unfriendRequest`,
          })

          const response = await axios.patch(url, {userProfileId: otherUserId});
          console.log("Friend request respond",response)
          router.refresh();
      }
      catch(error)
      {
          console.log(error);
      }
    }
    return ( 
        <div
              className="space-y-2 h-[280px] "
            >
              {pageFriendsProp.map((friendMember) => 
            {
              const whichFriend = friendMember.blocked;
              if(profileId !== whichFriend.id)
              return(
                <div
                  key={whichFriend.id}
                  className="flex"
                >
                    <div                    
                    className={
                      "font-semibold text-sm flex flex-row text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition "
                    }
                      onClick={()=>onOpen("UserProfileDisplay", {userProfilePropAPI:whichFriend, currentUserPropAPIID: profileId },)}
                    >
                      <UserProfileAvatar 
                        src={whichFriend.imageUrl}
                        className="h-8 w-8 md:h-8 md:w-8"
                        
                      />
                      <p
                        className="text-center pl-[18px] h-full"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                      }}
                      >  
                        {whichFriend.name}
                      </p>
                    </div>
                    <div
                      className="ml-auto"
                      style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                      }}
                      onClick={() =>onUnblockChange(whichFriend.id)}
                    >
                      <CircleSlash2Icon /> Unblock
                    </div>
                </div>
                
              )
            }
            )}
        </div>          
     );
}
 
export default FriendProfileComponent;