"use client";

import qs from "query-string";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";

import { usePrompt } from "@/hooks/use-prompt-store";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserProfileAvatar } from "@/components/uihelper/user-profile-avatar";
import { Book, Cat, Check, Crown, Dog, Hammer, Loader2, MagnetIcon, Minus, MoreVerticalIcon, ShieldAlert, ShieldCheck, ShieldCheckIcon, ShieldEllipsis, ShieldEllipsisIcon, TreePalm } from "lucide-react";
import React, { useState } from "react";

import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuContent,
    DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { OldMemberRole } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ServerWithMembersWithProfiles } from "@/type";
const roleIconMap: {[key: string]: React.ReactNode} = {
    "GUEST": <TreePalm className="h-4 w-4"/>,
    "MEMBER": <Dog className="h-4 w-4"/>,
    "MODERATOR": <ShieldCheckIcon className="h-4 w-4"/>,
    "CREATOR": <Cat className="h-4 w-4"/>,
    "OWNER": <Crown className="h-4 w-4"/>,
    "LILWITCH": <MagnetIcon className="h-4 w-4"/>
}

export const ManageMemberPrompt = () => {
    const { onOpen, isOpen,onClose,type,propData } = usePrompt();
    const router = useRouter();

    const isPromptOpen = isOpen && type === "ManageMember";
    const { server } = propData as {server: ServerWithMembersWithProfiles};

    const [targetMemberId , setTargetMemberId] = useState("");
    
    const onKick = async (memberId: string) => {
        try {
            setTargetMemberId(memberId);
            const url = qs.stringifyUrl({
                url: `/api/members/delete-api`,
                query: {
                    serverId: server?.id,
                },
            });
        
            const response = await axios.patch(url, {memberId});
        
            router.refresh();
            onOpen("ManageMember", { server: response.data });
        } 
        catch (error) 
        {
          console.log(error);
        } 
        finally 
        {
          setTargetMemberId("");
        }
    }
    
    const onBan = async (userProfileId: string) => {
        try {
            setTargetMemberId(userProfileId);
            const url = qs.stringifyUrl({
                url: `/api/members/ban-api`,
                query: {
                    serverId: server?.id,
                },
            });
        
            const response = await axios.patch(url, {userProfileId: userProfileId, banStatus: "yes"});
        
            router.refresh();
        } 
        catch (error) 
        {
          console.log(error);
        } 
        finally 
        {
          setTargetMemberId("");
        }
    }

    const onRoleChange = async(memberId: string, role: OldMemberRole) => {
        try {
            setTargetMemberId(memberId);
            const url = qs.stringifyUrl({
                url: `/api/members/role-api`,
                query: {
                    serverId: server?.id,
                }
            })

            const response = await axios.patch(url, {memberId, role});

            router.refresh();
            onOpen("ManageMember", {server: response.data});
        }
        catch(error)
        {
            console.log(error);
        }
        finally
        {
            setTargetMemberId("");
        }
    }
        
    return ( 
        <Dialog open = {isPromptOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black overflow-hidden dark:bg-black dark:text-white">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle 
                        className="text-center text-2xl font-bold uppercase items-center"
                        style={{color: "chocolate"}}
                    >
                            Manage Member
                    </DialogTitle>
                    <DialogDescription 
                        className="text-center"
                        style={{color:"chocolate"}}
                    >
                        <div
                            style={{fontSize: 28,color: "pink"}}
                        >
                            {server?.Member?.length} 
                        </div>
                         Members
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea
                    className="mt-8 max-h-[420px] border items-center manage-member "
                >
                    {server?.Member?.map((member) => {
                        if(member.deleted === false)
                        return (
                        <div key={member.id}
                            className="flex items-center gap-x-2 mt-2 mb-2  "                            
                        >
                            <UserProfileAvatar 
                                src={member.userProfile.imageUrl}
                            />
                            <div className="flex flex-col ml-8 gap-y-1">
                                <div
                                    className="flex text-xs font-bold items-center gap-x-2 "
                                >
                                    {roleIconMap[member.role]}   
                                    {member.userProfile.name} 
                                </div>                                
                                <div
                                    className="flex text-xs font-bold items-center gap-x-2"
                                >
                                    {member.userProfile.email}
                                </div>                                
                            </div>
                            {server.userProfileId !== member.userProfileId && targetMemberId !== member.id && (
                                <div  
                                   className="flex flex-row ml-auto h-auto w-auto gap-x-2"
                                >
                                <DropdownMenu >
                                    <DropdownMenuTrigger>
                                        <MoreVerticalIcon 
                                            className="h-4 w-4 text-[#eb4a5285]"
                                        />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        side="right"
                                    >
                                        <DropdownMenuSub>
                                            <DropdownMenuSubTrigger
                                                className="flex items-center"
                                            >
                                                <ShieldAlert />
                                                <span>
                                                    Role
                                                </span>        
                                            </DropdownMenuSubTrigger>
                                            <DropdownMenuPortal>
                                                <DropdownMenuSubContent>
                                                    <DropdownMenuItem
                                                        onClick={() => onRoleChange(member.id,"GUEST")}
                                                    >
                                                        <TreePalm 
                                                            className="mr-2"
                                                        />
                                                        Guest
                                                        {member.role === "GUEST" && (
                                                            <Check 
                                                                className="text-[#ff3b3b] ml-auto"
                                                            />
                                                        )}
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => onRoleChange(member.id,"MEMBER")}
                                                    >
                                                        <Dog 
                                                            className="mr-2"
                                                        />
                                                        Member
                                                        {member.role === "MEMBER" && (
                                                            <Check 
                                                                className="text-[#ff3b3b] ml-auto"
                                                            />
                                                        )}
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => onRoleChange(member.id,"MODERATOR")}
                                                    >
                                                        <ShieldCheck 
                                                            className="mr-2"
                                                        />
                                                        Moderator
                                                        {member.role === "MODERATOR" && (
                                                        <Check 
                                                                className="text-[#ff3b3b] ml-auto"
                                                            />)
                                                        }
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => onRoleChange(member.id,"BOT")}
                                                    >
                                                        <ShieldEllipsisIcon 
                                                            className="mr-2"
                                                        />
                                                            Bot
                                                        {member.role === "BOT" && (
                                                            <Check 
                                                                className="text-[#ff3b3b] ml-auto"
                                                            />
                                                        )}                                             
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => onRoleChange(member.id,"SPECIALGUEST")}
                                                    >
                                                        <Book 
                                                            className="mr-2"
                                                        />
                                                            Special Guest
                                                        {member.role === "SPECIALGUEST" && (
                                                            <Check 
                                                                className="text-[#ff3b3b] ml-auto"
                                                            />
                                                        )}                                             
                                                    </DropdownMenuItem>
                                                </DropdownMenuSubContent>
                                            </DropdownMenuPortal>
                                        </DropdownMenuSub>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            onClick={() => onKick(member.id)}
                                        >
                                            <Minus />
                                            Kick
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => onBan(member.userProfileId)}
                                        >
                                            <Hammer />
                                            Ban
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>                                
                                </div>                              
                            )}
                            { targetMemberId === member.id && (
                                <Loader2 
                                 className="animate-pulse ml-auto"
                                />
                            )}                            
                        </div>
                        )
                    })}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}
