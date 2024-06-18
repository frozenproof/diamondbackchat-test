"use client"

import { AttachmentChannel, AttachmentDirect } from "@prisma/client"
import { FileIcon } from "lucide-react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { Key, ReactElement, JSXElementConstructor, ReactNode, AwaitedReactNode } from "react";

interface FilesDisplayProps {
    isChannel: boolean;
    fileProps?: AttachmentChannel[];
    directFileProps?: AttachmentDirect[];
}

interface FilesSimplified {
    id: string; fileUrl: string; name: string; type: string;
}

export const FilesDisplay = ({
    fileProps,
    isChannel,
    directFileProps
}: FilesDisplayProps) => {

        if(fileProps || directFileProps)
        {

            const realFileProps = (fileProps&&(!directFileProps)) ? (fileProps as unknown as FilesSimplified[]) : (directFileProps as unknown as FilesSimplified[]);
                
            // console.log("this is FilesDisplay",realFileProps)

            return (
                <div
                    className="w-full flex flex-col eup-image-container col-3"
                >
                    {
                        realFileProps.map((file: { type: string; id: string, name: string, fileUrl: string}) => {
                            const isImage = (file.type.split('/')[0] === "image")
                            const isVideo = (file.type.split('/')[0] === "video")
                            // console.log(file.type.split('/')[0])
                            return (
                                <div
                                    key={file.id}
                                >
                                    {isImage && (
                                    <a 
                                    href={file.fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="relative aspect-square rounded-md mt-2 overflow-hidden border flex items-center bg-secondary "
                                    style={
                                        {maxHeight:260,maxWidth:320}
                                    }
                                    >
                                    <Image
                                        src={file.fileUrl}
                                        alt={""}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"      
                                        placeholder="blur"
                                        blurDataURL="/image/iconfinal.ico"
                                    />
                                    </a>
                                    )}
                                    {isVideo && (
                                    <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
                                    <video 
                                        src={file.fileUrl}
                                        rel="noopener noreferrer"
                                        className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
                                        controls
                                        style={
                                            {maxHeight:260,maxWidth:480}
                                        }
                                    >
                                        {file.name}
                                    </video>
                                    </div>
                                    )}
                                    {!isImage && !isVideo && (
                                    <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
                                    <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
                                    <a 
                                        href={file.fileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
                                    >
                                        {file.name}
                                    </a>
                                    </div>
                                    )}
                                </div>
                            )
                        })
                    }
            
        
                </div>
            )
        }
    } 
