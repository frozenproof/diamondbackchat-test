"use client"

import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Settings  } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { usePrompt } from "@/hooks/use-prompt-store";
import { UserProfile, UserStatus } from "@prisma/client";
import qs from "query-string"
import axios from "axios";

interface UserProfileAvatarProps {
    currentUserProfile: UserProfile;
    className?: string;
};

export const UserButtonDiamond = ({
    currentUserProfile,
    className
}:UserProfileAvatarProps) => {
    const router = useRouter();
    const { onOpen } = usePrompt();
    const { signOut } = useClerk();
    const onUserStatusChange = async(status: UserStatus) => {
        try {
            const url = qs.stringifyUrl({
                url: `/api/user/display-status-api`,
            })

            const response = await axios.patch(url, {status});

            router.refresh();
        }
        catch(error)
        {
            console.log(error);
        }
    }
    return (
        <div
            className="w-full flex p-1 dark:bg-[#000000]"
        >
            <div
                className="flex "
            >
            <Avatar >
                <AvatarImage src={currentUserProfile.imageUrl} />
            </Avatar>
            <div 
                className=" flex flex-col flex-wrap h-auto overflow-hidden mt-auto"
            >
                <div
                    style={{color: "red",fontSize: "18px"}}
                >
                    {currentUserProfile.name}
                </div>
                <div
                    style={{color: "green",fontSize: "8px"}}
                >
                    {currentUserProfile.status}
                </div>
            </div>
            </div>
        <DropdownMenu
        >
            <DropdownMenuTrigger
                    className="focus:outline-none ml-auto align-middle h-full"
                    asChild                
            >
                <Settings 
                    className="h-8 w-8 pr-[8px]"
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent
                side="top"
                className="w-48"
            >
                <DropdownMenuItem
                   className="pointer-events-none"
                >
                    {currentUserProfile.userCurrentRank}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => onOpen("UserProfileDisplay",{userProfilePropAPI: currentUserProfile,currentUserPropAPIID: currentUserProfile.id})}
                >
                    My profile
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => onOpen("AccountSetting",{userProfilePropAPI: currentUserProfile})}
                >
                    Setting
                </DropdownMenuItem>
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        Status
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                        <DropdownMenuItem
                            onClick={() => onUserStatusChange("ONLINE")}
                        >
                            Online
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => onUserStatusChange("IDLE")}
                        >
                            Idle
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => onUserStatusChange("DO_NOT_DISTURB")}
                        >
                            Do not disturb
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => onUserStatusChange("INVISIBLE")}
                        >
                            Invisible
                        </DropdownMenuItem>
                    </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => signOut(() => router.push('/'))}
                >
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>            
        </DropdownMenu>        
        </div>
    )
}