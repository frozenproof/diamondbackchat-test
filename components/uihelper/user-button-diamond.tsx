"use client"

import {  AvatarImage, DiamondAvatar } from "@/components/ui/diamondavatar";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "../ui/dropdown-menu";
import Image from "next/image";
import { GlowingStarsBackgroundCard } from "../effects/glowing-stars";
import { DiamondBackground } from "../effects/diamond-background";
interface UserProfileAvatarProps {
    src?: string;
    name?: string;
    status?: string;
    className?: string;
};

export const UserButtonDiamond = ({
    src,
    name,
    status,
    className
}:UserProfileAvatarProps) => {
    const router = useRouter();
    const { signOut } = useClerk();

    return (
        <DropdownMenu
        >
            <DropdownMenuTrigger
                    className="focus:outline-none"
                    asChild                
            >
                
                    <div
                        className="flex w-full"
                    >
                        <DiamondAvatar >
                            <AvatarImage src={src} />
                        </DiamondAvatar>
                        
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
            </DropdownMenuTrigger>
            <DropdownMenuContent
                side="top"
                className="w-48"
            >
                <DropdownMenuItem>
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
    )
}