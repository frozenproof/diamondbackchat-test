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
import { Check, Copy, RefreshCw } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { channel } from "diagnostics_channel";


export const DeleteChannelPrompt = () => {
    const { onOpen, isOpen,onClose,type,propData } = usePrompt();
    const router = useRouter();

    const isPromptOpen = isOpen && type === "DeleteChannel";
    const { channel } = propData;

    const [ isLoading, setIsLoading ] = useState(false);

    const onDelete = async() => {
        try {
            setIsLoading(true);
            const serverId = channel?.serverId;
            await axios.delete(`/api/channels/${channel?.id}/delete-api`);
            onClose();
            router.refresh();
            router.push(`/server/${serverId}`);
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

export const DeleteDirectChannelPrompt = () => {
    const { onOpen, isOpen,onClose,type,propData } = usePrompt();
    const router = useRouter();

    const isPromptOpen = isOpen && type === "DeleteDirectChannel";
    const { directChannelProp } = propData;

    const [ isLoading, setIsLoading ] = useState(false);

    const onDelete = async() => {
        try {
            setIsLoading(true);
            await axios.delete(`/api/directChannel/${directChannelProp?.id}/delete-api`);
            onClose();
            router.refresh();
            router.push(`/meself/friend`);
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
