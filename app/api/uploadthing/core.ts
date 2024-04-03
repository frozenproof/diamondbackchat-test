import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UTFiles } from "uploadthing/server";
import { auth  } from "@clerk/nextjs";
import { currentUserProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

const f = createUploadthing();


const handleAuth = async() => {
    //de phong userId la object
    const {userId,sessionClaims} = auth();
    const realId = await currentUserProfile();
    if(!userId || !sessionClaims){
        throw new Error("Unauthorized");
    }

    return {userId:userId,EupPropId:realId?.id};
    // return {userId:userId,EupPropId:sessionClaims.eupId};
}
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourUniqueFileRouter = {
    serverImage: f({ image: {maxFileSize: "8MB",maxFileCount: 1}})
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),

} satisfies FileRouter;
 
export const multiFileRouter = {
    messageFile: f(
        {
            image:{maxFileCount:8,maxFileSize:"16MB"},
            pdf:{maxFileCount:8},
            video:{maxFileCount:8}
        })
    .middleware(async ({ req, files }) => {
        const fileOverrides = files.map((file) => {
            const newName = (file.name) ;
            return { ...file, name: newName};
        });
        // handleAuth();
        const authorie = await handleAuth();
        return { authorie, [UTFiles]: fileOverrides };
    })
    .onUploadComplete(async ({ metadata, file }) => {
        // console.log("Upload complete for userId:", metadata.authorie.userId);
        // console.log("Upload complete for userId:", metadata.authorie.EupPropId);
        // console.log("file url", file.url);
        return
    })
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourUniqueFileRouter;
export type MultiFileRouter = typeof multiFileRouter;