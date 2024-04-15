"use client"

import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Settings  } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { usePrompt } from "@/hooks/use-prompt-store";
import { UserProfile } from "@prisma/client";

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
                    <DropdownMenuItem>
                            Online
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Idle
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Do not disturb
                        </DropdownMenuItem>
                        <DropdownMenuItem>
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