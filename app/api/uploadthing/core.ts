import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@clerk/nextjs";

const f = createUploadthing();
 
const handleAuth = () => {
    //de phong userId la object
    const {userId} = auth();
    if(!userId){
        throw new Error("Unauthorized");
    }
    return {userId:userId};
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
            image:{maxFileCount:8},
            pdf:{maxFileCount:8},
            video:{maxFileCount:8}
        })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {})
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourUniqueFileRouter;
export type MultiFileRouter = typeof multiFileRouter;