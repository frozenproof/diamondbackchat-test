"use client"

import { usePrompt } from "@/hooks/use-prompt-store";
import { UserProfileAvatar } from "../uihelper/user-profile-avatar";
import { FriendWithProfile } from "@/type";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Cross } from "lucide-react";
import { useRouter } from "next/navigation";
import qs from "query-string"
import axios from "axios";

interface FriendProfileComponentInterface {
    pageFriendsProp: FriendWithProfile[];
    profileId: string;
}
enum FriendRequestStatus {
  ACCEPT,
  REFUSE
}
const FriendProfileComponent = (
    { 
        pageFriendsProp,
        profileId
    } : FriendProfileComponentInterface
) => {
    const {onOpen} = usePrompt();
    const router = useRouter();

    const onUserStatusChange = async(friendRequestId: string,friendConfirm: FriendRequestStatus) => {
      try {
          const url = qs.stringifyUrl({
              url: `/api/friend/confirm/${friendRequestId}`,
          })

          const response = await axios.patch(url, {friendConfirm});

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
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Cross />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            onClick={() => {onUserStatusChange(friendMember.id,FriendRequestStatus.ACCEPT)}}
                          >
                            Accept
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {onUserStatusChange(friendMember.id,FriendRequestStatus.REFUSE)}}
                          >
                            Refuse
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            Ignore
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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