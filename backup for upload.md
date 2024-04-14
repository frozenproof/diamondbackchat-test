"use client"

import { sendFileExtra } from "@/lib/send-file";
import { UploadMultiDropzone } from "@/lib/uploadthing";

import "@uploadthing/react/styles.css";
import { useSocket } from "../providers/socket-provider";
import { DirectMessage, Message } from "@prisma/client";

interface MultiFileUploadProps {
    channelIdProp : string;
    memberIdProp: string;
    type: "sentMem" | "direct" | undefined
}
export const MultiFileUpload = ({
    channelIdProp,
    memberIdProp,
    type
}: MultiFileUploadProps) => {

    const { socketActual } = useSocket();
    if(type)
    return ( 
        <UploadMultiDropzone
            endpoint = {"messageFile"}
            onClientUploadComplete={async (res) => {
                //     // onChange(res?.[0].url);
                // // console.log("Channel ID",channelIdProp)
                // // console.log("Member ID",memberIdProp)
                // // console.log("Lmao_UPLOADING",res);
                // // console.log("Res",typeof(res));
                // const temp = await sendFileExtra({channelIdFile:channelIdProp,userIdFile:memberIdProp,typeSend:type,resProp: res}).then(()=>{
                //     const fileMessage = (type === "direct") ? (temp as unknown as DirectMessage) : (temp as unknown as Message);

                //     console.log("this is file upload component",fileMessage);
                // });
            }}
            onUploadError={(error: Error) =>{
                console.log(error);
            }}
            
            />
     );
}
 