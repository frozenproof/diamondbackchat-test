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

export const UserProfilePrompt = () => {
    const { isOpen,onClose,type,propData } = usePrompt();
    const router = useRouter();
    const DATE_FORMAT = "d MMM yyyy, HH:mm";
    
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
        const onFriendRequest = async () => {
          if(!idChecker(userProfilePropAPI.id,currentUserPropAPIID))
          {
            const friendCheck = await axios.patch(`http://localhost:3000/api/friend/friendRequest/${userProfilePropAPI.id}`)
  
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
              className="flex ml-auto flex-col"
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
                  <div onClick={() => {}} >
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
                </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Member since {format(new Date(userProfilePropAPI.createdAt), DATE_FORMAT)}</Label>
  
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="framework">Note</Label>
                    
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

