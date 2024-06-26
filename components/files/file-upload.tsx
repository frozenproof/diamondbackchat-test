"use client"

import { UploadDropzone } from "@/lib/uploadthing";

import { X } from "lucide-react"
import Image  from "next/image"

import "@uploadthing/react/styles.css";

interface FileUploadProps {
        onChange: (url?: string) => void;
        value: string;
        endpoint: "serverImage"
}

export const FileUpload = ({
    onChange,
    value,
    endpoint
}: FileUploadProps) => {
    const fileType = value?.split(".").pop();
    if( value && fileType !== "pdf") {
        return (
            <div className="relative h-20 w-20">
                <Image
                    fill
                    src = {value}
                    alt = "Upload"
                    className="rounded-full"
                />
                <button
                    onClick={() => onChange("")}
                    className="bg-rose-500 text-center text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
                    type="button"
                >
                    <X className="h-4 x-4"/>
                </button>
            </div>
        )
    }


    return ( 
        <UploadDropzone
            endpoint = {endpoint}
            onClientUploadComplete={(res) => {
                    onChange(res?.[0].url);
            }}
            onUploadError={(error: Error) =>{
                console.log(error);
            }}
            />
     );
}
 