"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import axios from "axios"
import qs from "query-string"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { usePrompt } from "@/hooks/use-prompt-store";
import { useEffect } from "react";
import { useSocket } from "@/components/providers/socket-provider";

const formSchema = z.object({
    content: z.string().min(1,
        "Reply must not be empty")
})
export const ReplyMessagePrompt = () => {
    const { isOpen,onClose,type,propData } = usePrompt();
    const router = useRouter();
    const { socketActual } = useSocket();

    const isPromptOpen = isOpen && type === "ReplyMessage";
    const { memberPropAPI,messageId,apiUrl,isChannelSend,userProfilePropAPI }  = propData;

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues:{
            content: "",
        }
    }); 

          
    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) =>{
        try{
            const url = qs.stringifyUrl({
                url: (isChannelSend === true) ? `/api/messages/channel-send` : `/api/messages/direct-channel-send`,        
                query: {
                    serverId: memberPropAPI?.serverId,
                    channelId: apiUrl
                },        
            });
            console.log("api url",url);

            const result = await axios.post(url, {checkMessageReplyId: messageId, content: values.content, isReplyAPI: true});
            socketActual.emit("channel-input",`chat:${apiUrl}:messages`, result,"server-channel");
            form.reset();
            router.refresh();
            onClose();
        }
        catch(error)
        {
            console.log("we recieved an error",error);
        }
    }

    const handleClose = () => {
        form.reset();
        onClose();
    }

    useEffect(() => {

    },[memberPropAPI, form])
    
    if(messageId )
    {
        return ( 
            <Dialog open = {isPromptOpen} onOpenChange={handleClose}>
                <DialogContent className="bg-white text-black p-0 overflow-hidden">
                    <DialogHeader className="pt-8 px-6">
                        <DialogTitle className="text-2xl text-center font-bold">
                            Reply to {memberPropAPI?.nickname} {userProfilePropAPI?.name}
                        </DialogTitle>
                    </DialogHeader>
                    <Form  {...form}>
                        <form onSubmit = {form.handleSubmit(onSubmit)} 
                        className="space-y-8">
                            <div className="space-y-8 px-6">
                                <FormField 
                                control={form.control} 
                                name = "content"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                placeholder="Say something"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                                />
                            </div>
                            <div className="text-center justify-center items-center bg-gray-100 px-6 py-4">
                                <DialogFooter>
                                        <Button className="flex" disabled={isLoading} variant={"primary"}>
                                            Reply
                                        </Button>
                                </DialogFooter>
                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        )
    }

    }
