import { ServerWithMembersWithProfiles } from "@/type";
import { OldMemberRole } from "@prisma/client";

interface ServerSearchProps {
    server: ServerWithMembersWithProfiles;
    role?: OldMemberRole;
};

