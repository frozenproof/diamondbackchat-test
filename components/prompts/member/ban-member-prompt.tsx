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
import { Cat, Loader2, MagnetIcon, Minus, MoreVerticalIcon, ShieldCheckIcon, ShieldEllipsis } from "lucide-react";
import React, { useState } from "react";

import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { useRouter } from "next/navigation";
const roleIconMap: {[key: string]: React.ReactNode} = {
    "GUEST": <MagnetIcon />,
    "MEMBER": <MagnetIcon />,
    "MODERATOR": <ShieldCheckIcon className="h-4 w-4"/>,
    "CREATOR": <Cat className="h-4 w-4"/>,
    "OWNER": <ShieldEllipsis className="h-4 w-4"/>,
    "LILWITCH": <MagnetIcon className="h-4 w-4"/>
}

export const BanMemberPrompt = () => {
    const { onOpen, isOpen,onClose,type,propData } = usePrompt();
    const router = useRouter();

    const isPromptOpen = isOpen && type === "BanManage";
    const { banList } = propData ;

    const [targetMemberId , setTargetMemberId] = useState("");
    
  
    const onBan = async (userProfileId: string,serverId : string) => {
        try {
            setTargetMemberId(userProfileId);
            const url = qs.stringifyUrl({
                url: `/api/members/ban-api`,
                query: {
                    serverId: serverId,
                },
            });
        
            const response = await axios.patch(url, {userProfileId: userProfileId, banStatus: "no"});
        
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

     
    return ( 
        <Dialog open = {isPromptOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle 
                        className="text-center text-2xl font-bold uppercase items-center"
                        style={{color: "chocolate"}}
                    >
                        Unban Member
                    </DialogTitle>
                    <DialogDescription 
                        className="text-center"
                        style={{color:"chocolate"}}
                    >
                        <div
                            style={{fontSize: 28,color: "pink"}}
                        >
                            {banList?.length} 
                        </div>
                         Members
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea
                    className="mt-8 max-h-[420px] border items-center manage-member "
                >
                    {banList?.map((banMember) => {
                        return (
                        <div key={banMember.userProfileId}
                            className="flex items-center gap-x-2 mt-2 mb-2  "                            
                        >
                            <UserProfileAvatar 
                                src={banMember.userProfile.imageUrl}
                            />
                            <div className="flex flex-col ml-8 gap-y-1">
                                <div
                                    className="flex text-xs font-bold items-center gap-x-2 "
                                >
                                    {banMember.userProfile.name} 
                                </div>                                
                                <div
                                    className="flex text-xs font-bold items-center gap-x-2"
                                >
                                    {banMember.userProfile.email}
                                </div>                                
                            </div>
                            {(
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
                                        <DropdownMenuItem
                                            onClick={() => onBan(banMember.userProfileId,banMember.serverId)}
                                        >
                                            <Minus />
                                            Remove ban
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>                                
                                </div>                              
                            )}
                            { targetMemberId === banMember.userProfileId && (
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
