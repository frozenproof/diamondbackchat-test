
import { Member, Message, Server, UserProfile ,AttachmentChannel, DirectMessage, DirectChannel, AttachmentDirect, Channel } from "@prisma/client";

export type ServerWithMembersWithProfiles = 
                                    Server & {
                                        Member:(
                                            Member & {
                                                userProfile:UserProfile
                                            })[];
                                        }

export type MemberWithProfile = Member & {
                                        userProfile:UserProfile
                                    };
export type DirectChannelWithProfile = DirectChannel & {
                                      memberOne: UserProfile,
                                      memberTwo: UserProfile
                                    }


export type MessageWithMemberWithProfileWithFile = Message & {
        member: Member & {
          userProfile: UserProfile
        };
        AttachmentChannel: AttachmentChannel[];
      } 

export type DirectMessageWithProfileWithFile = DirectMessage & {
  userProfile: UserProfile ; 
  AttachmentDirect : AttachmentDirect[];
};
         
 
export type ServerWithChannels = Server & {
  Channel: Channel[]
};