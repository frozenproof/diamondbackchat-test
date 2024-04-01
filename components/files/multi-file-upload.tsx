"use client"

import { UploadDropzone, UploadMultiDropzone } from "@/lib/uploadthing";

import "@uploadthing/react/styles.css";

interface MultiFileUploadProps {

}
export const MultiFileUpload = ({

}: MultiFileUploadProps) => {

    return ( 
        <UploadMultiDropzone
            endpoint = {"messageFile"}
            onClientUploadComplete={(res) => {
                    // onChange(res?.[0].url);
                    console.log("Lmao_UPLOADING",res);
            
            }}
            onUploadError={(error: Error) =>{
                console.log(error);
            }}
            
            />
     );
}
 