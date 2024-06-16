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


export const DeleteServerPrompt = () => {
    const { onOpen, isOpen,onClose,type,propData } = usePrompt();
    const router = useRouter();

    const isPromptOpen = isOpen && type === "DeleteServer";
    const { server } = propData;

    const [ isLoading, setIsLoading ] = useState(false);

    const onLeave = async() => {
        try {
            setIsLoading(true);
            
            await axios.patch(`/api/servers/delete-api`,{serverId: server?.id});
            onClose();
            router.refresh();
            router.push("/meself/friend");
        }
        catch(error)
        {
            console.log(error)
        }
    }
 
 return ( 
        <Dialog open = {isPromptOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden dark:bg-black dark:text-white">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Deleting the server ? 
                    </DialogTitle>
                    <DialogDescription className="text-center">
                        Taking a break from {server?.name} ?
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
                            onClick={() => onLeave()}
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
