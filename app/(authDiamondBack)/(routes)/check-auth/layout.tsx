import { redirect } from "next/navigation";

import { currentUserProfile } from "@/lib/current-profile";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Authorization",
};

const CheckAuthPageLayout = async (
) => {
    const profile = await currentUserProfile();

    if(!profile){
        // console.log(profile);
        return redirect(`/login-dbc`);
    }   
    else
    {
        // console.log(profile);
        return ( 
            redirect(`/meself`)
        );
    }
}
 
export default CheckAuthPageLayout;