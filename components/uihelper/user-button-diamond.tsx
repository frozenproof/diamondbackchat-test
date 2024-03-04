import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserProfileAvatarProps {
    src?: string;
    className?: string;
};

export const UserButtonDiamond = ({
    src,
    className
}:UserProfileAvatarProps) => {
    return (
        <Avatar
            className={cn(
                "h-full w-full md:h-10 md:w-10",
                className
            )}
        >
            <AvatarImage 
                className={cn(className)}
            src={src} />
        </Avatar>
    )
}