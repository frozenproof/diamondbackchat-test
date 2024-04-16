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
    src?: string;
    name?: string;
    status?: string;
    about?: string;
    className?: string;
};

export const UserButtonDiamond = ({
    src,
    name,
    status,
    about,
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
            className="w-full flex hover:bg-[#cdcdd391] p-1"
        >
            <div
                className="flex "
            >
            <Avatar >
                <AvatarImage src={src} />
            </Avatar>
            <div 
                className=" gap-x-1 gap-y-1 pl-2 flex flex-col flex-wrap h-auto overflow-hidden mt-auto"
            >
                <div
                    style={{color: "red",fontSize: "18px"}}
                >
                    {name}
                </div>
                <div
                    style={{color: "green",fontSize: "8px"}}
                >
                    {status}
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
                    onClick={() => onOpen("AccountSetting",{userProfilePropAPI: {imageUrl:src, name: name,about: about} as unknown as UserProfile})}
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