
import { Member, Message, Server, UserProfile ,AttachmentChannel, DirectMessage, DirectChannel, AttachmentDirect, Channel, Friend, Block, BannedServerMember } from "@prisma/client";

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
export type MessageWithMemberWithProfile = Message & {
  member: Member & {
    userProfile: UserProfile
  };
}
export type DirectChannelMessageWithProfile = Message & {
    userProfile: UserProfile
}
export type MessageWithMemberWithProfileWithFile = Message & {
        member: Member & {
          userProfile: UserProfile
        };
        AttachmentChannel: AttachmentChannel[];
        messageParent: MessageWithMemberWithProfile;
      } 

export type DirectMessageWithProfileWithFile = DirectMessage & {
  userProfile: UserProfile ; 
  AttachmentDirect : AttachmentDirect[];
  messageParent: DirectChannelMessageWithProfile;  
};
         
 
export type ServerWithChannels = Server & {
  Channel: Channel[]
};

export type FriendWithProfile = Friend & {
  friendOne: UserProfile,
  friendTwo: UserProfile
  };

export type BlockWithProfile = Block & {
  blocker: UserProfile,
  blocked: UserProfile
  };

export type BanWithMemberWithProfile = BannedServerMember & {
  
    userProfile: UserProfile
 
}