"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"

import { useModal } from "@/hooks/use-modal-store";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Copy, RefreshCw } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";
import axios from "axios";


export const InviteServerModal = () => {
    const { onOpen, isOpen,onClose,type,data } = useModal();
    const origin = useOrigin();

    const isModalOpen = isOpen && type === "InviteServer"
    const { server } = data;

    const [ copied, setCopied ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);

    const inviteUrl = `${origin}/invite/${server?.inviteCode}`;
    
    const onCopy = () => {
        navigator.clipboard.writeText(inviteUrl);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 1000);
    }

    const onNew = async() => {
        try {
            setIsLoading(true);
            const response = await axios.patch(`/api/servers/${server?.id}/invite-code`);

            onOpen("InviteServer", {server: response.data})
        }
        catch(error) {
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }
    }
 return ( 
        <Dialog open = {isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Invite anyone 
                    </DialogTitle>
                    <DialogDescription className="text-center">
                        Games are more fun with friends !
                    </DialogDescription>
                </DialogHeader>
                <div className=" text-center p-8">
                    <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/80 items-center ">
                    Server invite link
                    </Label>
                    <div className="flex items-center mt-2 gap-x-2">
                        <Input
                            className="bg-zinc-200/80 border-0 
                            focus-visible:ring-2 text-[#db8bca]
                            focus-visible:ring-offset-0"
                            value={inviteUrl}
                        />
                    <Button
                        onClick={onCopy} 
                        size="sm"
                        className="ml-auto bg-[#cc8c43] hover:bg-[#cc8c48]"
                    >
                        {copied ? <Check /> : <Copy />}                    
                    </Button>
                     
                    </div>
                    <Button 
                        variant="ghost"
                        className="text-xs mt-4" 
                    >
                        Generate a new invite link
                        <RefreshCw className="ml-2 mr-auto" />
                    </Button>
                </div>
             </DialogContent>
        </Dialog>
    )
}
