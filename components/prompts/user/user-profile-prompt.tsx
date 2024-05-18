"use client";

import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import { EllipsisVertical, OctagonX } from 'lucide-react';  
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { usePrompt } from "@/hooks/use-prompt-store";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { DropdownMenu, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import qs from "query-string"

export const UserProfilePrompt = () => {
    const { isOpen,onClose,type,propData } = usePrompt();
    const router = useRouter();
    const DATE_FORMAT = "d MMM yyyy";
    
    const isPromptOpen = isOpen && type === "UserProfileDisplay";
    const { userProfilePropAPI , currentUserPropAPIID }  = propData;
 
    const handleClose = () => {
        onClose();
    }

    if(userProfilePropAPI && currentUserPropAPIID)
    {        
      try {
        const onDirectChatRequest = () => {
          if(!idChecker(userProfilePropAPI.id,currentUserPropAPIID))
          {
            router.push(`/api/directRequest/${userProfilePropAPI?.id}`);
          }
        }
        const onBlockUser = async () => {
          if(!idChecker(userProfilePropAPI.id,currentUserPropAPIID))
          {
            const url = qs.stringifyUrl({
              url: `/api/user/block-api`,
          })

          const response = await axios.patch(url, {otherUserId: userProfilePropAPI.id});
          }
        }
        const onFriendRequest = async () => {
          if(!idChecker(userProfilePropAPI.id,currentUserPropAPIID))
          {
            const url = qs.stringifyUrl({
                url: `/api/friend/friendRequest`,
            })
            const friendCheck = await axios.patch( url , {userProfileId: userProfilePropAPI.id})
  
            console.log("user profile prompt friend request",friendCheck.data);
          }
        }
        return ( 
          <Dialog open = {isPromptOpen} onOpenChange={handleClose}>
              <DialogContent className="bg-white text-black p-0 ">
              <Card className="w-full">
        <CardHeader>
          <CardTitle
            className="flex"
          >
            <Avatar
              className="h-[80x] w-[80px]"
            >
              <AvatarImage   src={userProfilePropAPI.imageUrl} 
             />
            </Avatar>
            <div
              className="flex ml-auto flex-col pt-[28px]"
            >                  
            <DropdownMenu>
              <DropdownMenuTrigger>
                <EllipsisVertical  />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="left"
                className="w-48"
              >
              <DropdownMenuItem
                onClick={onFriendRequest}
              >            
                Friend Request
              </DropdownMenuItem>
              <DropdownMenuItem>                  
                  <div onClick={onDirectChatRequest} >
                    Message
                  </div>
              </DropdownMenuItem>
              <DropdownMenuItem>                  
                  <div onClick={onBlockUser} >
                    Block
                  </div>
              </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Card className="h-[320px]">
            <CardHeader>
              <CardTitle>{userProfilePropAPI.name}</CardTitle>
              <CardDescription>
                {(userProfilePropAPI.about === "") && (
                  <div className={
                    `text-sm text-zinc-600 dark:text-zinc-300 ` 
                  }
                  >
                    Look like this user didn&#39;t add anything to their bio.
                  </div>
                )}
                {(userProfilePropAPI.about !== "") && (
                  <div className={
                    `text-sm text-zinc-600 dark:text-zinc-300 ` 
                  }
                  >
                    {userProfilePropAPI.about}
                  </div>
                )}
                </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Joined Liltrees since {format(new Date(userProfilePropAPI.createdAt), DATE_FORMAT)}</Label>

                  </div>
                  <div className="flex flex-col space-y-1.5 pt-[28px]">
                    <Label htmlFor="framework">Status</Label>
                      This user is currently {userProfilePropAPI.status}.
                      <br/>
                      This user is also a {userProfilePropAPI.userCurrentRank}
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
            </CardFooter>
          </Card>
        </CardContent>
        </Card>
              </DialogContent>
          </Dialog>
      )
    } catch (e)
    {
      return null
    }
  }
}


function idChecker(id1: string , id2: string)
{
  return(id1 === id2)
}

