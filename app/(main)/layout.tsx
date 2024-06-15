"use server"

import { NavigationSideBar } from "@/components/navigation/navigation-sidebar";
import { LoadingMainPage } from "@/components/uihelper/loading-wait";
import { currentUserProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";

var MainLayout = async ({
    children
}:{
    children: React.ReactNode;
}) => {
    const currentSystem = await db.maintainence.findFirst()
    if(currentSystem && currentSystem.isOffline)
    {
        return (
            <div
                className="text-center"
            >
                <div>
                    This message is from developers and administrators.
                </div>
                (　･ω･)☞	We are currently doing maintainence.       
                <br />
                From {currentSystem.from.toDateString()} until {currentSystem.until.toDateString()} the maintainence will be performed.        
            </div>    
        )
    }

    const profile = await currentUserProfile();
    if(!profile)
    {
        return redirect(`/`);
    }
    if(profile)
    {
        const userRank = await db.userBilling.findFirst({
            where: {
                userProfileId2: profile.id
            },
            include: {
                Subcription: true
            }
        })
        if(userRank){
            // console.log("hmmm")
            if(userRank.Subcription.length == 0 || userRank.Subcription.filter(x => x.isActive == true).length == 0){
                console.log("User billing is empty of subscription")
                await db.userBilling.delete({
                    where: {
                        customerId_email2: {
                            customerId: userRank.customerId,
                            email2: userRank.email2
                        }
                    }
                })
                await db.userProfile.update(
                    {
                        where: {
                            id: profile.id
                        },
                        data: {
                            userCurrentRank: "Basic Member"
                        }
                    }
                )
            }
            else{
                try {
                    switch(userRank.Subcription[0].productId) {
                    case "prod_Q5RcVjWOzXbWVg":
                        await db.userProfile.update(
                            {
                                where: {
                                    id: profile.id
                                },
                                data: {
                                    userCurrentRank: "Liltree Maniac"
                                }
                            }
                        )
                        break;
                    case "prod_Q5RgRJAoVFYUYd":
                        await db.userProfile.update(
                            {
                                where: {
                                    id: profile.id
                                },
                                data: {
                                    userCurrentRank: "Liltree Lover"
                                }
                            }
                        )
                        break;
                    case "prod_Q5jEtILOSyfHem":
                        await db.userProfile.update(
                            {
                                where: {
                                    id: profile.id
                                },
                                data: {
                                    userCurrentRank: "Liltree Supporter"
                                }
                            }
                        )
                    break;                                              
                        default:
                            break;   
                    }
                }
                catch(error) {
                    
                }
            }
            
        } 
        else if(!userRank)
        {
            await db.userProfile.update({
                where: {
                    id: profile.id
                },
                data: {
                    userCurrentRank: "Basic Member"
                }
            })
        }
        return ( 
            <Suspense
                fallback={<LoadingMainPage />}
            >
                <div className="h-full mainapp">
                    <div className="hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0"> 
                    <NavigationSideBar
                        userProfileIdNavigationSideBar={profile.id}
                    />             
                    </div>
                    <main className="md:pl-[72px] h-full insidemain">
                        {children}
                    </main>
                </div>
           </Suspense>
         );
    }
}
 
export default MainLayout;