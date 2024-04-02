"use client";

import { Moon, Smile, Trees } from "lucide-react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useTheme } from "next-themes";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MemberWithProfile } from "@/type";
import { useRouter } from "next/navigation";
import { UserProfileAvatar } from "../uihelper/user-profile-avatar";

interface UserProfilePopoverProps {
  serverIdProp: string;
  messageMemberProp:MemberWithProfile;
  currentMemberProp: MemberWithProfile;
}
export const UserProfilePopover = ({
  currentMemberProp,
  messageMemberProp,
  serverIdProp
}: UserProfilePopoverProps) => {

  const router = useRouter();
  const onMemberClick = () => {
    console.log(`memberPROP2/${messageMemberProp.id == currentMemberProp.id ? `Giong nhau + ${currentMemberProp.id}` : `Khac nhau + ${messageMemberProp.id}`} `);
    if (messageMemberProp.id === currentMemberProp.id) {
      return;
    }
    if (messageMemberProp.id !== currentMemberProp.id)
    {
      router.push(`/servers/${serverIdProp}/directChatChannels/${messageMemberProp.id}/`);
    }
  }
  return (
    <Popover>
      <PopoverTrigger>
        <div className="cursor-pointer hover:drop-shadow-md transition">
          {/* <UserProfileAvatar src={memberProp.imageUrl} /> */}
          <UserProfileAvatar src={messageMemberProp.userProfile.imageUrl} />
        </div>
      </PopoverTrigger>
      <PopoverContent 
        side="right" 
        sideOffset={20}
        className=""
      >
        
        <div onClick={onMemberClick} >
          Click here to direct chat
        </div>
      </PopoverContent>
    </Popover>
  )
}