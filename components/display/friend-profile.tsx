"use client"

import { usePrompt } from "@/hooks/use-prompt-store";
import { UserProfileAvatar } from "../uihelper/user-profile-avatar";
import { FriendWithProfile } from "@/type";
import { cn } from "@/lib/utils";
import { Cross } from "lucide-react";

interface FriendProfileComponentInterface {
    pageFriendsProp: FriendWithProfile[];
    profileId: string;
}
const FriendProfileComponent = (
    { 
        pageFriendsProp,
        profileId
    } : FriendProfileComponentInterface
) => {
    const {onOpen} = usePrompt();
    
    return ( 
        <div
              className="space-y-2 h-[280px] "
            >
              {pageFriendsProp.map((friendMember) => 
            {
              const whichFriend = (profileId === friendMember.friendOneId) ? friendMember.friendTwo : friendMember.friendOne;
              return(
                <div
                  key={whichFriend.id}
                  className="flex"
                >
                    <div                    
                    className={
                      "font-semibold text-sm flex flex-row text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition "
                    }
                      onClick={()=>onOpen("UserProfile", {userProfilePropAPI:whichFriend, currentUserPropAPIID: profileId },)}
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
                    {(friendMember.pending === true) && 
                    (
                      <div
                      className="ml-auto"
                      style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                      }}
                    >
                      <Cross  />
                    </div>
                    )}
                    
                </div>
                
              )
            }
            )}
            </div>          
     );
}
 
export default FriendProfileComponent;