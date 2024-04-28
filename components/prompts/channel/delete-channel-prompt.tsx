"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"

import { usePrompt } from "@/hooks/use-prompt-store";
import { Button } from "../../ui/button";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";


export const DeleteChannelPrompt = () => {
    const { onOpen, isOpen,onClose,type,propData } = usePrompt();
    const router = useRouter();

    const isPromptOpen = isOpen && type === "DeleteChannel";
    const { channel: channelProp } = propData;

    const [ isLoading, setIsLoading ] = useState(false);

    const onDelete = async() => {
        try {
            setIsLoading(true);
            const serverId = channelProp?.serverId;
            await axios.patch(`/api/channels/delete-api`, {channelId: channelProp?.id});
            onClose();
            router.refresh();
            router.push(`/servers/${serverId}`);
        }
        catch(error)
        {
            console.log(error)
        }
    }
 
 return ( 
        <Dialog open = {isPromptOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Deleting the channel ? 
                    </DialogTitle>
                    <DialogDescription className="text-center">
                        This action is irreversible !
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter
                    className="bg-gray-100 px-6 py-2"
                >
                    <div
                        className="flex items-center justify-between w-full"
                    >
                        <Button
                            disabled={isLoading}
                            onClick={onClose}
                            variant="ghost"
                        >
                            Take me back 
                        </Button>
                        <Button
                            disabled={isLoading}
                            onClick={() => onDelete()}
                            variant="redprimary"
                        >
                            Yes 
                        </Button>
                    </div>
                </DialogFooter>
             </DialogContent>
        </Dialog>
    )
}

