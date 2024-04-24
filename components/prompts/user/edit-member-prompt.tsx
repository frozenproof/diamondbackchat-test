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
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { usePrompt } from "@/hooks/use-prompt-store";
import { useEffect } from "react";

const formSchema = z.object({
    nickname: z.string().min(1,
        "Nick name must not be empty")
})
export const EditMemberNicknamePrompt = () => {
    const { isOpen,onClose,type,propData } = usePrompt();
    const router = useRouter();

    const isPromptOpen = isOpen && type === "MemberNickname";
    const { memberPropAPI }  = propData;

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues:{
            nickname: "",
        }
    }); 

          
    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) =>{
        try{
            const url = qs.stringifyUrl({
                url: `/api/members/name-api`,
                query: {
                    serverId: memberPropAPI?.serverId,
                },
            });

            const result = await axios.patch(url, {memberId: memberPropAPI?.id, nickname2: values.nickname});
            // console.log("api url",result);
            form.reset();
            router.refresh();
            onClose();
        }
        catch(error)
        {
            console.log(values);
        }
    }

    const handleClose = () => {
        form.reset();
        onClose();
    }

    useEffect(() => {
        if(memberPropAPI){            
        form.setValue("content",memberPropAPI.nickname);
        }
    },[memberPropAPI, form])
    
    if(memberPropAPI)
    {
        return ( 
            <Dialog open = {isPromptOpen} onOpenChange={handleClose}>
                <DialogContent className="bg-white text-black p-0 overflow-hidden">
                    <DialogHeader className="pt-8 px-6">
                        <DialogTitle className="text-2xl text-center font-bold">
                            Edit your nickname
                        </DialogTitle>
                        <DialogDescription className="text-center">
                            How you call yourself
                        </DialogDescription>
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
                                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                            Nick name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                placeholder="Enter your nick name"
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
                                            Save
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
