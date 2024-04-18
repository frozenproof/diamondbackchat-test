"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import axios from "axios"
import { FileUpload } from "@/components/files/file-upload";

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
    name: z.string().min(1,{
        message: "User name is required."
    }),
    imageUrl: z.string().min(1, {
        message: "User image is required."
    }),
    about: z.string()
})
export const EditUserPrompt = () => {
    const { isOpen,onClose,type,propData } = usePrompt();
    const router = useRouter();

    const isPromptOpen = isOpen && type === "AccountSetting";
    const { userProfilePropAPI }  = propData;

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues:{
            name: userProfilePropAPI?.name as string,
            imageUrl: userProfilePropAPI?.imageUrl as string,
            about: userProfilePropAPI?.about as string
        }
    }); 

          
    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) =>{
        try{
            await axios.patch(`/api/user/setting-api`,values);
            //  const result =
            // console.log("EditUserPrompt",result)
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
        if(userProfilePropAPI){      
        form.setValue("name",userProfilePropAPI.name);
        form.setValue("about",userProfilePropAPI.about);
        form.setValue("imageUrl", userProfilePropAPI.imageUrl);
        }
    },[userProfilePropAPI, form])
    
    if(userProfilePropAPI)
    {
        return ( 
            <Dialog open = {isPromptOpen} onOpenChange={handleClose}>
                <DialogContent className="bg-white text-black p-0 overflow-hidden">
                    <DialogHeader className="pt-8 px-6">
                        <DialogTitle className="text-2xl text-center font-bold">
                            Edit user settings
                        </DialogTitle>
                        <DialogDescription className="text-center">
                            Tell us better about yourself
                        </DialogDescription>
                    </DialogHeader>
                    <Form  {...form}>
                        <form onSubmit = {form.handleSubmit(onSubmit)} 
                        className="space-y-8">
                            <div className="space-y-8 px-6">
                                <div className="flex items-center justify-center text-center">
                                    {/* IMAGE UPLOAD              */}
                                    <FormField
                                        control={form.control}
                                        name="imageUrl"
                                        defaultValue={userProfilePropAPI.imageUrl}
                                        render={({field}) => (
                                            <FormItem
                                            >
                                                <FormControl>
                                                    <FileUpload 
                                                        endpoint="serverImage"
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                   />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                
                                <FormField 
                                control={form.control} 
                                name = "name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                            User name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                placeholder="Enter your user name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                                />
                                <FormField 
                                control={form.control} 
                                name = "about"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                            About myself
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                placeholder="Share your stories"
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
