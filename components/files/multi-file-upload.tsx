"use client"

import { sendFileExtra } from "@/lib/send-file";
import { UploadDropzone, UploadMultiDropzone } from "@/lib/uploadthing";

import "@uploadthing/react/styles.css";

interface MultiFileUploadProps {
    channelIdProp : string;
    memberIdProp: string;
    type: "sentMem" | "direct"
}
export const MultiFileUpload = ({
    channelIdProp,
    memberIdProp,
    type
}: MultiFileUploadProps) => {

    return ( 
        <UploadMultiDropzone
            endpoint = {"messageFile"}
            onClientUploadComplete={async (res) => {
                    // onChange(res?.[0].url);
                console.log("Channel ID",channelIdProp)
                console.log("Member ID",memberIdProp)
                console.log("Lmao_UPLOADING",res);
                console.log("Res",typeof(res));
                const temp = await sendFileExtra({channelIdFile:channelIdProp,userIdFile:memberIdProp,typeSend:"sentMem",resProp: res});
            }}
            onUploadError={(error: Error) =>{
                console.log(error);
            }}
            
            />
     );
}
 