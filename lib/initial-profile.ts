"use server"

import { currentUser } from "@clerk/nextjs";

import { db } from "@/lib/db"
import { redirect } from "next/navigation";

export const initialFirstProfile = async () => {

    try{
        const user = await currentUser();
    if(!user) {
        return ;
    }
        else
    {        
        {const profileInitial = await db.userProfile.findUnique({
            where:{
                userId: user.id
            }
        })
    
        if(profileInitial)
            return profileInitial;
        else
        {
            const newProfileInitial = await db.userProfile.create({
                data:{
                    userId: user.id,
                    name: `${user.firstName} ${user.lastName}`,
                    imageUrl: user.imageUrl,
                    email: user.emailAddresses[0].emailAddress
                }
            }) ;
        
            return newProfileInitial;
        }   }
    }
    }
    catch(error)
    {
        console.log("error from profile filler",error);
        return redirect("/");
    }   
}