"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"

import { usePrompt } from "@/hooks/use-prompt-store";
import { useOrigin } from "@/hooks/use-origin";
import { ServerWithMembersWithProfiles } from "@/type";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserProfileAvatar } from "@/components/uihelper/user-profile-avatar";
import { Cat, MagnetIcon, PanelsTopLeft, ShieldCheckIcon, ShieldEllipsis } from "lucide-react";
import React from "react";

const roleIconMap: {[key: string]: React.ReactNode} = {
    "GUEST": <MagnetIcon />,
    "MEMBER": <MagnetIcon />,
    "MODERATOR": <ShieldCheckIcon className="h-4 w-4"/>,
    "CREATOR": <Cat className="h-4 w-4"/>,
    "OWNER": <ShieldEllipsis className="h-4 w-4"/>,
    "LilWitch": <MagnetIcon className="h-4 w-4"/>
}

export const ManageMemberPrompt = () => {
    const { onOpen, isOpen,onClose,type,data } = usePrompt();
    const origin = useOrigin();

    const isPromptOpen = isOpen && type === "ManageMember";
    const { server } = data as {server: ServerWithMembersWithProfiles};

 
    
    return ( 
        <Dialog open = {isPromptOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold uppercase">
                        Manage members
                    </DialogTitle>
                    <DialogDescription 
                        className="text-center"
                        style={{color:"chocolate"}}
                    >
                        {server?.members?.length} Members
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea
                    className="mt-8 max-h-[420px] pr-8 border items-center"
                >
                    {server?.members?.map((member) => (
                        <div key={member.id}
                            className="flex items-center gap-x-2 mt-2 mb-2 manage-member "                            
                        >
                            <UserProfileAvatar 
                                src={member.userProfile.imageUrl}
                            />
                            <div className="flex flex-col ml-8 gap-y-1">
                                <div
                                    className="flex text-xs font-bold items-center gap-x-2"
                                >
                                    {member.userProfile.name} {roleIconMap[member.role]}                
                                </div>
                                <div
                                    className="flex text-xs font-bold items-center gap-x-2"
                                >
                                    {member.userProfile.email}
                                </div>
                            </div>
                        </div>
                    ))}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}
