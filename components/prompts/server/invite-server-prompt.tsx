"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";

import { usePrompt } from "@/hooks/use-prompt-store";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Check, Copy, Plus, RefreshCw } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";
import { useState, Suspense, useEffect } from "react";
import axios from "axios";
import { LoadingMainPage } from "@/components/uihelper/loading-wait";
import QRCode from "@/components/extra/url/url";


export const InviteServerPrompt = () => {
    const { onOpen, isOpen,onClose,type,propData } = usePrompt();
    const origin = useOrigin();

    const isPromptOpen = isOpen && type === "InviteServer";
    //day la thong tin server gui vao 
    //tu interface cua server header
    //thong qua prompt store
    const { server } = propData;
    // const { server } = data as {server: ServerWithMembersWithProfiles}

    const [ copied, setCopied ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ isUrlLoading, setIsUrlLoading ] = useState(false);

    const [ realUrl, setRealUrl ] = useState("Wait for server to load!");
    const [ realUrl2, setRealUrl2 ] = useState("Click plus to get invite link!");

    const onCopy = () => {
        navigator.clipboard.writeText(realUrl);
        setCopied(true);
        
        setTimeout(() => {
            setCopied(false);
        }, 1000);
    }

    const onNew = async() => {
        try {
            setIsLoading(true);
            const temp = await axios.patch(`/api/invite/inviteServerGenerate`, {serverId: server?.id}).then((response) => {setRealUrl(`${origin}/invite-euphoria/`+response.data.inviteCode); setRealUrl2(response.data.inviteCode);})
            
            // onOpen("InviteServer", {server: response.data});
        }
        catch(error) {
            console.log("Very weird bug",error);
        }
        finally {
            setIsLoading(false);
        }
    }

    
    const fetchRealUrl = async() => {
        try {
            console.log(server?.id);
            setIsUrlLoading(true);
            const temp = await axios.patch(`/api/invite/inviteServerSearch`, {serverId: server?.id}).then((response) => {setRealUrl(`${origin}/invite-euphoria/`+response.data.inviteCode); setRealUrl2(response.data.inviteCode);})

            console.log("Information is here",temp);

        } 
        catch (error) {
            console.error('Error:', error);
        }
        finally {
            setIsUrlLoading(false);
        }
    }
    useEffect(() => {
        if (isPromptOpen) {
            fetchRealUrl();
        }
    }, [isPromptOpen]);

    if(server)
    {
        return ( 
            <Dialog open = {isPromptOpen} onOpenChange={onClose}>
                <DialogContent className="bg-white text-black p-0 overflow-hidden dark:bg-slate-900 dark:text-white">
                    <DialogHeader className="pt-8 px-6">
                        <DialogTitle className="text-2xl text-center font-bold">
                            Invite anyone right now
                        </DialogTitle>
                        <DialogDescription className="text-center">
                            Games are more fun with friends !
                        </DialogDescription>
                    </DialogHeader>
                    <div className=" text-center p-8 items-center flex flex-col w-full">
                    <div>
                        <QRCode data={realUrl2} />
                    </div>   
                        <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/80 items-center dark:text-blue-300">
                        Server invite link
                        </Label>
                        <div className="flex items-center mt-2 gap-x-2 w-full">
                            <Suspense
                                fallback={<LoadingMainPage />}
                            >
                                <Input
                                    disabled={isLoading}
                                    className="bg-zinc-200/80 dark:bg-black border-0 
                                    focus-visible:ring-2 text-[#db8bca] dark:text-white
                                    focus-visible:ring-offset-0 w-full"
                                    value={realUrl}
                                    readOnly
                                />
                            </Suspense>
                            <Suspense>
    
                            </Suspense>
                            <Button
                            disabled={isLoading || copied || isUrlLoading}
                            onClick={onCopy} 
                            size="sm"
                            className="ml-auto bg-[#cc8c43] hover:bg-[#cc8c48]"
                        >
                            {copied ? <Check /> : <Copy />}                    
                        </Button>

                        </div>
                        {/* <Input
                                disabled={isLoading}
                                className="mt-2 bg-zinc-200/80 border-0 
                                focus-visible:ring-2 text-[#db8bca]
                                focus-visible:ring-offset-0"
                                value={server?.inviteCode}
                                readOnly
                            /> */}
                        <Button 
                            disabled={isLoading}
                            onClick={onNew}
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
    
}
