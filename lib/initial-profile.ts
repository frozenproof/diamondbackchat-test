import { currentUser, redirectToSignIn } from "@clerk/nextjs";

import { db } from "@/lib/db"

export const initialFirstProfile = async () => {

    const user = await currentUser();
    if(!user) {
        return redirectToSignIn();
    };

    const profileInitial = await db.userProfile.findUnique({
        where:{
            userId: user.id
        }
    })

    if(profileInitial)
        return profileInitial;
    
    const newProfileInitial = await db.userProfile.create({
        data:{
            userId: user.id,
            name: `${user.firstName} ${user.lastName}`,
            imageUrl: user.imageUrl,
            email: user.emailAddresses[0].emailAddress
        }
    }) ;

    return newProfileInitial;
}