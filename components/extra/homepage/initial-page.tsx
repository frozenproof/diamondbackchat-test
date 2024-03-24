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

import { Card } from "@/components/effects/special-card";
import { CardBody, CardContainer, CardItem } from "@/components/effects/3d-card";
import Link from "next/link";

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
            
            <div
                className="h-[88px] w-full flex"
            >
                <div className="flex basis-full flex-col p-4 tracking-tight h-full
                items-center ">
                    <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-center">
                        Euphoria 
                    </h3>
                    <div className="text-base !m-0 !p-0 font-normal">
                        <span className="text-slate-500 ">
                            Fast and simple chat, and beautiful
                        </span>
                    </div>
                </div>                
                <div className="flex basis-full flex-col p-4 tracking-tight h-full
                items-center ">
                    <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-center">
                        Euphoria 
                    </h3>
                    <div className="text-base !m-0 !p-0 font-normal">
                        <span className="text-slate-500 ">
                            Free and available, for everyone
                        </span>
                    </div>
                </div>
            </div>
            <div
                className="w-full bg-transparent h-full flex flex-col justify-center"
            >
                <div
                    className="w-full bg-transparent h-full flex flex-row justify-center"
                >
                    <CardContainer className="inter-var">
                        <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                            {!isLoggedin&&(<CardItem
                            translateZ={20}
                            as={Link}
                            href={`/check-auth`}
                            className="text-xl font-bold text-neutral-600 dark:text-white"
                            >
                                Sign up today and use animated avatars
                            </CardItem>)}
                            {isLoggedin&&(<CardItem
                            translateZ={20}
                            as={Link}
                            href={`/check-auth`}
                            className="text-xl font-bold text-neutral-600 dark:text-white"
                            >
                                Login now 
                            </CardItem>)}
                            <CardItem
                            as="p"
                            translateZ="60"
                            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                            >
                            *where you actually do something instead of just watching
                            </CardItem>
                            <div className="flex justify-between items-center mt-[8px]">
                            </div>
                        </CardBody>
                    </CardContainer>
                </div>
            </div>
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

