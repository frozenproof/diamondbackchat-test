"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react";
import axios from "axios"

import { redirect, useRouter } from "next/navigation";
import { PinContainer, PinPerspective } from "@/components/effects/3d-pin";

import { EvervaultCardVer3 } from "@/components/effects/EvervaultCardVer3";
import { ModeToggle } from "@/components/uihelper/mode-toggle";

import { AnimatePresence, motion } from "framer-motion";

import { HomePageHeader } from "./homepage-header";
import { HomePageAuth } from "./homepage-auth";

const formSchema = z.object({
    name: z.string().min(1,{
        message: "Server name is required."
    }),
    imageUrl: z.string().min(1, {
        message: "Server image is required."
    })
})
export const InitialPage = ({
    isLoggedin   
}:{
    isLoggedin: Boolean
}) => {
    const [isMounted , setIsMounted] = useState(false);
    
    const router = useRouter();

    useEffect(() => {
        setIsMounted(true);
    }, []);
    
    if(!isMounted){
        return null;
    }

    const enterSelfPage = () => {
        return redirect(`${origin}/meself`);
    }
    
return ( 
        <div
            className="flex items-center flex-col w-full h-full relative"
        >
            <HomePageHeader />
            <HomePageAuth 
                isLoggedin={isLoggedin}
            />
            <div
                className="h-[88px] w-full flex items-center text-center"
            >
                <div
                    className="text-center w-full"
                >
                    Where it started
                </div>
            </div>
            <div
                className="w-full bg-transparent h-full flex flex-col justify-center"
            >
                <div
                    className="w-full bg-transparent h-full flex flex-row justify-center"
                >
                    
                </div>
            </div>
            
            
            <PinPerspective />
                
        </div>
    )
}

