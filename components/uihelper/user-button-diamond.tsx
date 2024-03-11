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
                            className=" gap-x-2 gap-y-1 pl-2 flex flex-col flex-wrap h-auto"
                            style={{color: "red",fontSize: "10px"}}
                        >
                            <div>
                                {name}
                            </div>
                            <div>
                                {status}
                            </div>
                        </div>
                        {/* <Image 
                            src={src!}
                            alt="User"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            width={48}
                            height={48}
                        /> */}
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