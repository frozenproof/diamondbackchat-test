"use client"

import { ServerWithMembersWithProfiles } from "@/type";
import { OldMemberRole } from "@prisma/client";

interface ServerHeaderProps {
    server: ServerWithMembersWithProfiles;
    role?: OldMemberRole;
};

export const ServerHeader = ({
    server,
    role
}:ServerHeaderProps) => {
    return ( 
        <div>
            Server Header :3
        </div>
     );
}
 

