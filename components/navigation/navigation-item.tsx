"use client"

import Image from "next/image";

import { useParams, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

import { ActionTooltip } from "@/components/uihelper/action-tooltip";

interface NavigationItemProps {
    id: string;
    imageUrl: string;
    name: string;
}

export const NavigationItem = ({
    id,
    imageUrl,
    name,
}: NavigationItemProps) => {
    const params = useParams()
    const router = useRouter()

    const onClick = () => {
        router.push(`/servers/${id}`)
    }
    console.log("image url for navigation item",imageUrl)
    return (
        <ActionTooltip
            side="right"
            align="center"
            label={name}
        >
            <button
                onClick={onClick}
                className="group relative flex items-center"
            >
                <div className={cn(
                    "absolute left-0 bg-primary rounded-r-full transition-all w-[4px]  h-[36px]",
                    params?.serverId === id ? "bg-[#bd9d59]" : "bg-transparent"
                )} />
                <div className={cn(
                    "relative group flex mx-3  h-[48px] w-[48px] rounded-[24px] transition-all group-hover:rounded-[16px] overflow-hidden",
                    params?.serverId === id && "text-primary bg-primary/10 rounded-[16px]",
                )} >
                    <Image
                        fill
                        src={imageUrl}
                        alt="Server"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        placeholder="blur"
                        blurDataURL="/image/iconfinal.ico"
                    />
                </div>
            </button>
         </ActionTooltip>
    )
}
