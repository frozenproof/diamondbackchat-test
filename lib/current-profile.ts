"use server"

import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";



export const currentUserProfile = async() =>{
    const {userId} = auth();
    
    if(!userId){
        return null;
    }

    const profile = await db.userProfile.findUnique({
        where:{
            userId           
        }
    });
    
    if(profile)
        if(profile.deleted == true )
            {
                const profile2 = await db.userProfile.update({
                    where:{
                        userId           
                    },
                    data: {
                        deleted: false
                    }
                });
                return profile2;
            }

    return profile;
}