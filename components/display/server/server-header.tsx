"use client"

import { BanWithMemberWithProfile, ServerWithMembersWithProfiles } from "@/type";
import { BannedServerMember, Member, OldMemberRole } from "@prisma/client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Cat, ChevronDown, Settings, UserPlus, Users, LogOut, PlusSquare, Fingerprint } from "lucide-react";

import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { usePrompt } from "@/hooks/use-prompt-store";

interface ServerHeaderProps {
    server: ServerWithMembersWithProfiles;
    banned: BanWithMemberWithProfile[];
    member: Member;
};

export const ServerHeader = ({
    server,
    banned,
    member
}:ServerHeaderProps) => {
    const { onOpen } = usePrompt();
    const role = member.role;
    const isCreator = role === OldMemberRole.CREATOR;
    const isAdmin = isCreator || role === OldMemberRole.ADMIN;
    const isOwner = isAdmin || role === OldMemberRole.OWNER;
    const isModerator = isOwner || role === OldMemberRole.MODERATOR;
    return ( 
            <DropdownMenu>
            <DropdownMenuTrigger
                className="focus:outline-none"
                asChild
            >
                <button
                    className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2
                    hover:bg-emerald-300/10 dark:hover:bg-zinc-800/50 transition ml-auto"
                >
                    {server.name} 
                    <ChevronDown className="h-5 w-5 ml-auto"/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-48 text-xs font-medium dark:text-white space-y-[2px] "
            >
                {
                    isAdmin && (
                        <DropdownMenuItem
                            className="text-amber-700 dark:text-indigo-200  px-3 py-2 text-sm cursor-pointer"
                        >
                            Change More 
                            <Cat className="h-4 w-4 ml-auto"/>
                        </DropdownMenuItem>
                    )
                }
                <DropdownMenuItem
                    className="text-amber-700 dark:text-indigo-200  px-3 py-2 text-sm cursor-pointer"
                    onClick={()=>onOpen("InviteServer", {server: server},)}
                >
                    Invite More 
                    <UserPlus className="h-4 w-4 ml-auto"/>
                </DropdownMenuItem>
                {
                    isModerator && (
                        <DropdownMenuItem
                            className="text-amber-700 dark:text-indigo-200  px-3 py-2 text-sm cursor-pointer"
                            onClick={() => onOpen("EditServer", {server: server},)}
                        >
                            Server Settings 
                            <Settings className="h-4 w-4 ml-auto"/>
                        </DropdownMenuItem>
                    )
                }
                {
                    isModerator && (
                        <DropdownMenuItem
                            onClick={() => onOpen("ManageMember", { server: server })}
                            className="text-amber-700 dark:text-indigo-200  px-3 py-2 text-sm cursor-pointer"
                        >
                            Manage Members 
                            <Users className="h-4 w-4 ml-auto"/>
                        </DropdownMenuItem>
                    )
                }
                {
                    !isModerator && (
                        <DropdownMenuItem
                            onClick={() => onOpen("DisplayMember", { server: server })}
                            className="text-amber-700 dark:text-indigo-200  px-3 py-2 text-sm cursor-pointer"
                        >
                            Display Members 
                            <Users className="h-4 w-4 ml-auto"/>
                        </DropdownMenuItem>
                    )
                }
                {
                    isModerator && (
                        <DropdownMenuItem
                            onClick={() => onOpen("BanManage", { banList: banned })}
                            className="text-amber-700 dark:text-indigo-200  px-3 py-2 text-sm cursor-pointer"
                        >
                            Unban Members 
                            <Users className="h-4 w-4 ml-auto"/>
                        </DropdownMenuItem>
                    )
                }
                {
                    isModerator && (
                        <DropdownMenuItem
                            onClick={() => onOpen("CreateChannel", {server:server})}
                            className="text-amber-700 dark:text-indigo-200  px-3 py-2 text-sm cursor-pointer"
                        >
                            Create Channel 
                            <PlusSquare className="h-4 w-4 ml-auto"/>
                        </DropdownMenuItem>
                    )
                }
               <DropdownMenuItem 
                    className="text-amber-700  px-3 py-2 text-sm cursor-pointer"
                    onClick={() => onOpen("MemberNickname", {memberPropAPI: member})}
                >
                    Change Nickname
                    <Fingerprint className="h-4 w-4 ml-auto"/>
                </DropdownMenuItem>   
                <DropdownMenuItem className="" disabled>
                    <DropdownMenuSeparator/>
                </DropdownMenuItem>                 
                {
                    isOwner && (
                        <DropdownMenuItem 
                        onClick={() => onOpen("DeleteServer", {server:server})}
                        className="text-red-600  px-3 py-2 text-sm cursor-pointer"
                    >
                        Delete Server
                        <LogOut className="h-4 w-4 ml-auto"/>
                    </DropdownMenuItem>                    
                    )
                }
                {
                    !isOwner && (
                        <DropdownMenuItem
                        onClick={()=>onOpen("LeaveServer", {server: server})}
                        className="text-red-600 hover:text-amber-700  px-3 py-2 text-sm cursor-pointer"
                    >
                        Leave Server
                        <LogOut className="h-4 w-4 ml-auto"/>
                    </DropdownMenuItem>                    
                    )
                }
 
            </DropdownMenuContent>
        </DropdownMenu>
     );
}
 

