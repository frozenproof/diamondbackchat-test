"use client"

import { AttachmentChannel, AttachmentDirect } from "@prisma/client"
import Image from "next/image";

interface FilesDisplayProps {
    isChannel: boolean;
    fileProps?: AttachmentChannel[];
}

export const FilesDisplay = ({
    fileProps,
    isChannel
}: FilesDisplayProps) => {

    console.log("this is FilesDisplay",fileProps)
    if(isChannel)
    if(fileProps)
    return (
        <div>
            {
                fileProps.map((file) => {
                    const isImage = (file.type.split('/')[0] === "image")
                    console.log(file.type.split('/')[0])
                    return (
                        <div
                            key={file.id}
                        >
                            {isImage && (
                            <a 
                            href={file.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative aspect-square rounded-md mt-2 overflow-hidden border flex items-center bg-secondary h-48 w-48"
                            >
                            <Image
                                src={file.fileUrl}
                                alt={""}
                                fill
                                className="object-cover"
                            />
                            </a>
                        )}
                        </div>
                    )
                })
            }
              {/* 

              {isPDF && (
                <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
                <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
                <a 
                    href={fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
                >
                    PDF File
                </a>
                </div>
            )} */}

        </div>
    )
}