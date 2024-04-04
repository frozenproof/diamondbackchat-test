"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MemberWithProfile } from "@/type";
import { useRouter } from "next/navigation";
import { UserProfileAvatar } from "../uihelper/user-profile-avatar";

import { Label } from "../ui/label";
import { Avatar, AvatarImage } from "../ui/avatar";
import { format } from "date-fns";
import { Button } from "../ui/button";
import { UserProfile } from "@prisma/client";

interface UserProfilePopoverProps {
  serverIdProp?: string;
  messageMemberProp?:MemberWithProfile;
  currentMemberProp?: MemberWithProfile;
  directUserProp?: UserProfile;
  currentUserProp?: UserProfile;
  justUserProp?: UserProfile;
}
export const UserProfilePopover = ({
  currentMemberProp,
  messageMemberProp,
  serverIdProp,
  directUserProp,
  currentUserProp,
  justUserProp
}: UserProfilePopoverProps) => {

  const router = useRouter();
  const DATE_FORMAT = "d MMM yyyy, HH:mm";

  if(messageMemberProp && currentMemberProp && serverIdProp)
  {
    const onMemberClick = () => {
      if(!idChecker(messageMemberProp.userProfileId,currentMemberProp.userProfileId))
      {
        router.push(`/api/directRequest/${messageMemberProp.userProfileId}`);
      }
    }
  
    return (
      <Popover>
        <PopoverTrigger>
          <div className="cursor-pointer hover:drop-shadow-md transition">
            <UserProfileAvatar src={messageMemberProp.userProfile.imageUrl} />
          </div>
        </PopoverTrigger>
        <PopoverContent 
          side="right" 
          // sideOffset={0}
          className="bg-transparent w-[380px]"
        >
          <Card className="w-full">
          <CardHeader>
            <CardTitle>
              <Avatar
                className="h-[80x] w-[80px]"
              >
                <AvatarImage   src={messageMemberProp.userProfile.imageUrl} 
               />
              </Avatar>           
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Card className="h-[320px]">
              <CardHeader>
                <CardTitle>{messageMemberProp.userProfile.name}</CardTitle>
                <CardDescription>
                  {(messageMemberProp.userProfile.about === "") && (
                    <div className={
                      `text-sm text-zinc-600 dark:text-zinc-300 ` 
                    }
                    >
                      Look like this user didn't add anything to their bio.
                    </div>
                  )}
                  </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Member since {format(new Date(messageMemberProp.userProfile.createdAt), DATE_FORMAT)}</Label>
  
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="framework">Note</Label>
                      
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button>                  
                  <div onClick={onMemberClick} >
                    Click here to direct chat
                  </div>
                </Button>
              </CardFooter>
            </Card>
          </CardContent>
          </Card>
          
        </PopoverContent>
      </Popover>
    )
  }
  if(directUserProp && currentUserProp)
  {
    const onMemberClick = () => {
      if(!idChecker(directUserProp.id,currentUserProp.id))
      {
        router.push(`/api/directRequest/${directUserProp.id}`);
      }
    }
  
    return (
      <Popover>
        <PopoverTrigger>
          <div className="cursor-pointer hover:drop-shadow-md transition">
            <UserProfileAvatar src={directUserProp.imageUrl} />
          </div>
        </PopoverTrigger>
        <PopoverContent 
          side="right" 
          // sideOffset={0}
          className="bg-transparent w-[380px]"
        >
          <Card className="w-full">
          <CardHeader>
            <CardTitle
              className="flex "
            >
              <Avatar
              className="h-[80x] w-[80px]"
              >
                <AvatarImage   src={directUserProp.imageUrl} 
               />
              </Avatar>        
              <Button
                className="ml-auto flex"
              >                  
                  <div onClick={onMemberClick} >
                    Friend Request
                  </div>
               </Button>
               <Button>                  
                  <div onClick={onMemberClick} >
                    Message
                  </div>
                </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Card className="h-[320px]">
              <CardHeader>
                <CardTitle>{directUserProp.name}</CardTitle>
                <CardDescription>
                  {(directUserProp.about === "") && (
                    <div className={
                      `text-sm text-zinc-600 dark:text-zinc-300 ` 
                    }
                    >
                      Look like this user didn't add anything to their bio.
                    </div>
                  )}
                  </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Member since {format(new Date(directUserProp.createdAt), DATE_FORMAT)}</Label>
  
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
          
        </PopoverContent>
      </Popover>
    )
  }
}

function idChecker(id1: string , id2: string)
{
  return(id1 === id2)
}

