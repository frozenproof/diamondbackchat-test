"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react";
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
import { redirect, useRouter } from "next/navigation";
import { PinContainer, PinPerspective } from "@/components/effects/3d-pin";

import { EvervaultCardVer3 } from "@/components/effects/EvervaultCardVer3";

const formSchema = z.object({
    name: z.string().min(1,{
        message: "Server name is required."
    }),
    imageUrl: z.string().min(1, {
        message: "Server image is required."
    })
})
export const InitialPage = () => {
    const [isMounted , setIsMounted] = useState(false);
    
    const router = useRouter();

    useEffect(() => {
        setIsMounted(true);
    }, []);
    
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues:{
            name: "",
            imageUrl: "",
        }
    }); 

const isLoading = form.formState.isSubmitting;

const onSubmit = async (values: z.infer<typeof formSchema>) =>{
    try{
        await axios.post("/api/servers",values);

        form.reset();
        router.refresh();
        window.location.reload();
    }
    catch(error)
    {
        console.log(values);
    }
}

if(!isMounted){
    return null;
}

const enterSelfPage = () => {
    return redirect(`${origin}/meself`);
}

return ( 
        <div
            className="flex items-center flex-col w-full h-full"
        >
            
            <EvervaultCardVer3
                className="h-[88px] w-full"
            >
                <div className="flex basis-full flex-col p-4 tracking-tight h-full ">
                <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base ">
                    Euphoria 
                </h3>
                <div className="text-base !m-0 !p-0 font-normal">
                    <span className="text-slate-500 ">
                        Fast and simple chat, just like ole days
                    </span>
                </div>
                    <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500" />
                </div>
            </EvervaultCardVer3>
            <div
                className="items-center text-center"
            >
                <div>
                    This is cat
                </div>
            </div>
            <PinPerspective />
        </div>
    )
}
