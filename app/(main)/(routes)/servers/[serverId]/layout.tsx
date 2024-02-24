import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { ServerSideBar } from "@/components/server/server-sidebar";
import { currentUserProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";


const ServerIdPageLayout = async ({
    children,
    params}:
    {
        children: React.ReactNode;
        params: {serverId: string}
    }
) => {
    const profile = await currentUserProfile();

    if(!profile){
        return redirectToSignIn();
    }

    const server = await db.server.findUnique
    ({
        where:{
            id: params.serverId,
            members:{
                some:{
                    userProfileId: profile.id,
                }
            }
        }
    })

    if(!server)
    {
        return redirect("/");
    }

    return ( 
        <div className="h-full">
            <div className="hidden md:flex h-full w-48 z-20 flex-col fixed inset-y-0">
                <ServerSideBar serverId={params.serverId}/>
            </div>
            <main className="h-full md:pl-48">
                {children}    
            </main>
        </div>
     );
}
 
export default ServerIdPageLayout;