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
        return redirect(`/login-dbc`);
    }   
    else
    {
        return ( 
            redirect(`/meself/friend`)
        );
    }
}
 
export default CheckAuthPageLayout;