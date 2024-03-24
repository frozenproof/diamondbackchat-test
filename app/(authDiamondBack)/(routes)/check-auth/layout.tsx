import { redirect } from "next/navigation";

import { ServerSideBar } from "@/components/display/server/server-sidebar";
import { currentUserProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { UserButtonDiamond } from "@/components/uihelper/user-button-diamond";
import { GlowingStarsBackgroundCard } from "@/components/effects/glowing-stars";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Authorization",
};

const CheckAuthPageLayout = async ({
    children,
    params}:
    {
        children: React.ReactNode;
        params: {serverId: string}
    }
) => {
    const profile = await currentUserProfile();

    if(!profile){
        // console.log(profile);
        return redirect(`/login-dbc`);
    }   
    else
    return ( 
        redirect(`/meself`)
    );
}
 
export default CheckAuthPageLayout;