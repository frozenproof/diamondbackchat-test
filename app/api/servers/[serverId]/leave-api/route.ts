import { currentUserProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function PATCH
(
    req:Request,
    { params }: { params: {serverId: string}}
) 
    {
        try 
        {
            const profile = await currentUserProfile();

            if(!profile) {
                throw new Error("Unauthorized");
            }
            
            if(!params.serverId)
            {
                throw new Error("Server Id doesn't exist")
            }

            const server = await db.server.update({
                where: {
                    id: params.serverId,
                    userProfileId: {
                        not: profile.id
                    }
                },
                data: {
                    Member: {
                        deleteMany: {
                            userProfileId: profile.id
                        }
                    }
                }
            })

            revalidatePath("/servers");
            return NextResponse.json(server);
        }
        catch(error)
        {
            console.log("[SERVER_ID_LEAVE",error);
            return new NextResponse("Internal Error ", {status: 500});
        }
    }