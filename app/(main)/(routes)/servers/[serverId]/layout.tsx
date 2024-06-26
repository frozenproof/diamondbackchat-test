"use server"

import { redirect } from "next/navigation";

import { ServerSideBar } from "@/components/display/server/server-sidebar";
import { currentUserProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { UserButtonDiamond } from "@/components/uihelper/user-button-diamond";

import { Metadata, ResolvingMetadata } from "next";

type Props = {
    params: { serverId: string }
  }
   
export async function generateMetadata(
    { params }: Props,
  ): Promise<Metadata> {
    
    const server = await db.server.findUnique
    ({
        where:{
            id: params.serverId,
        }
    })

    return {
      title: server?.name,
    }
}

const ServerIdPageLayout = async({
    children,
    params}:
    {
        children: React.ReactNode;
        params: {serverId: string}
    }
) => {
    const profile = await currentUserProfile();

    if(!profile){
        return redirect("/");
    }

    const server = await db.server.findUnique
    ({
        
        where:{
            id: params.serverId,
            Member:{
                some:{
                    userProfileId: profile.id,
                    deleted: false
                },
            },
            deleted: false
        }
    })

    if(!server)
    {
        return redirect("/meself/friend");
    }

    return ( 
        <div className="h-full">
            <div className="hidden md:flex h-full w-48 z-20 flex-col fixed inset-y-0">
                <ServerSideBar serverId={params.serverId}/>
                <div
                    className="mt-auto pt-1 pb-1 pl-1 flex"
                >
                    <UserButtonDiamond 
                        currentUserProfile={profile}
                    />
                </div>
            </div>
            <main className="h-full md:pl-48">
                {children}    
            </main>
        </div>
     );
}
 
export default ServerIdPageLayout;