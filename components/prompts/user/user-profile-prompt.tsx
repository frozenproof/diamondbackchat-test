"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import axios from "axios"
import { FileUpload } from "@/components/files/file-upload";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { usePrompt } from "@/hooks/use-prompt-store";
import { Label } from "@/components/ui/label";

export const UserProfilePrompt = () => {
    const { isOpen,onClose,type,propData } = usePrompt();
    const router = useRouter();
    const DATE_FORMAT = "d MMM yyyy, HH:mm";
    
    const isPromptOpen = isOpen && type === "UserProfile";
    const { userProfilePropAPI , currentUserPropAPIID }  = propData;
 
    const handleClose = () => {
        onClose();
    }

    if(userProfilePropAPI && currentUserPropAPIID)
    {        
    const onMemberClick = () => {
        if(!idChecker(userProfilePropAPI.id,currentUserPropAPIID))
        {
          router.push(`/api/directRequest/${userProfilePropAPI?.id}`);
        }
      }

      return ( 
        <Dialog open = {isPromptOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
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
          <Button>                  
              <div onClick={onMemberClick} >
                Friend Request
              </div>
           </Button>
           <Button>                  
              <div onClick={onMemberClick} >
                Message
              </div>
            </Button>
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
}
    }


function idChecker(id1: string , id2: string)
{
  return(id1 === id2)
}

