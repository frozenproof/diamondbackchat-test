"use client";

import * as z from "zod";

import { useEffect, useState } from "react";

import { redirect, useRouter } from "next/navigation";
import { PinPerspective } from "@/components/effects/3d-pin";

import { HomePageHeader } from "./homepage-header";
import { HomePageAuth } from "./homepage-auth";
import { AppHistory } from "../document/app-history";
import { ModeToggle } from "@/components/uihelper/mode-toggle";

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

    
return ( 
        <div
            className="flex items-center flex-col w-full h-full relative "
        >
            <HomePageHeader />
            <div
                // className="
                // bg-red-800
                // "
            >
            <HomePageAuth 
                isLoggedin={isLoggedin}
            />
            </div>
            <div
                className="pt-[8px]"
            >
            <ModeToggle />
            </div>
            {/* <AppReviews /> */}
            <AppHistory />
            <div
                className="h-[88px] w-full flex items-center text-center pt-8"
            >
                <div
                    className="text-center w-full"
                >
                    ... Now we arrive at the present 
                </div>
            </div>
            
            
            <div>
                This seems impressive?
            </div>
            <PinPerspective />
                
        </div>
    )
}

