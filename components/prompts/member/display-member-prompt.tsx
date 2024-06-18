"use client";

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
import { Cat, Crown, Dog, MagnetIcon, ShieldCheckIcon, TreePalm } from "lucide-react";
import React, { useState } from "react";

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

    const isPromptOpen = isOpen && type === "DisplayMember";
    const { server } = propData as {server: ServerWithMembersWithProfiles};

    return ( 
        <Dialog open = {isPromptOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black overflow-hidden dark:bg-black dark:text-white">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle 
                        className="text-center text-2xl font-bold uppercase items-center"
                        style={{color: "chocolate"}}
                    >
                            Display Member
                    </DialogTitle>
                    <DialogDescription 
                        className="text-center"
                        style={{color:"chocolate"}}
                    >
                        <div
                            style={{fontSize: 28,color: "pink"}}
                        >
                            {server?.Member?.filter(x => !x.deleted).length} 
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
                        </div>
                        )
                    })}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}
