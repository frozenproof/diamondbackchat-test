import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";



export const currentServerInvite = async() =>{
    const {userId} = auth();
    
    if(!userId){
        return null;
    }

    const profile = await db.userProfile.findUnique({
        where:{
            userId
        }
    });

    return profile;
}