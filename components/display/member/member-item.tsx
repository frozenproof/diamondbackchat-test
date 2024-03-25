"use client";

import { Member, OldMemberRole, UserProfile, Server } from "@prisma/client";
import { CrownIcon, ShieldAlert, ShieldCheck } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { UserProfileAvatar } from "@/components/uihelper/user-profile-avatar";
import { MemberWithProfile } from "@/type";

interface MemberItemProps {
  // member: (
  //   Member & {
  //       userProfile:UserProfile
  //   })
  member: MemberWithProfile
  // user:  UserProfile ;
  // role: OldMemberRole ;
}

const roleIconMap: {[key: string]: React.ReactNode} = {
  [OldMemberRole.GUEST]:       null,
  [OldMemberRole.MODERATOR]:   <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
  [OldMemberRole.ADMIN]:       <ShieldAlert className="h-4 w-4 ml-2 text-rose-500" />,
  [OldMemberRole.OWNER]:       <CrownIcon className="h-4 w-4 ml-2 text-yellow-300" />
}

export const MemberItem = ({
  member ,
  // user ,
  // role
}: MemberItemProps) => {
  const params = useParams();
  const router = useRouter();

  const icon = roleIconMap[member.role];

  const onClick = () => {
    router.push(`/meself/chat/${member.userProfile.id}`)
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
        params?.memberId === member.userProfileId && "bg-zinc-700/20 dark:bg-zinc-700"
      )}
    >
      <UserProfileAvatar 
        src={member.userProfile.imageUrl}
        className="h-8 w-8 md:h-8 md:w-8"
      />
      <p
        className={cn(
          "font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
          params?.memberId === member.userProfileId && "text-primary dark:text-zinc-200 dark:group-hover:text-white"
        )}
      >
        {member.userProfile.name}
      </p>
      <div
        className="ml-auto"
      >
        {icon}
      </div>
    </button>
  )
}