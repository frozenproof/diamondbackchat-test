import { NextApiRequest } from "next";

import { NextApiResponseServerIo } from "@/type";
import { currentProfilePages } from "@/lib/current-profile-pages";
import { db } from "@/lib/db";

export async function POST(
  req: NextApiRequest,
  res: NextApiResponseServerIo,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const profile = await currentProfilePages(req);
    const { content, fileUrl } = req.body;
    const { serverId, channelId } = req.query;
    
    if (!profile) {
      return res.status(401).json({ error: "Unauthorized" });
    }    
  
    if (!serverId) {
      return res.status(400).json({ error: "Server ID missing" });
    }
      
    if (!channelId) {
      return res.status(400).json({ error: "Channel ID missing" });
    }
          
    if (!content) {
      return res.status(400).json({ error: "Content missing" });
    }

    const server = await db.server.findFirst({
      where: {
        id: serverId as string,
        Member: {
          some: {
            userProfileId: profile.id
          }
        }
      },
      include: {
        Member: true,
      }
    });

    if (!server) {
      return res.status(404).json({ message: "Server not found" });
    }

    const channel = await db.channel.findFirst({
      where: {
        id: channelId as string,
      }
    });

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    const member = server.Member.find((member) => member.userProfileId === profile.id);

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    const message = await db.message.create({
      data: {
        content,
        attachment: false,
        channelId: channelId as string,
        memberId: member.id
      },
      include: {
        member: true
        }
    });

    const channelKey = `chat:${channelId}:messages`;

    res?.socket?.server?.io?.emit(channelKey, message);

    return res.status(200).json(message);
  } catch (error) {
    console.log("[MESSAGES_POST]", error);
    return res.status(500).json({ message: "Internal Error" }); 
  }
}

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponseServerIo,
// ) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   try {
//     const profile = await currentProfilePages(req);
//     const { content, fileUrl } = req.body;
//     const { serverId, channelId } = req.query;
    
//     if (!profile) {
//       return res.status(401).json({ error: "Unauthorized" });
//     }    
  
//     if (!serverId) {
//       return res.status(400).json({ error: "Server ID missing" });
//     }
      
//     if (!channelId) {
//       return res.status(400).json({ error: "Channel ID missing" });
//     }
          
//     if (!content) {
//       return res.status(400).json({ error: "Content missing" });
//     }

//     const server = await db.server.findFirst({
//       where: {
//         id: serverId as string,
//         Member: {
//           some: {
//             userProfileId: profile.id
//           }
//         }
//       },
//       include: {
//         Member: true,
//       }
//     });

//     if (!server) {
//       return res.status(404).json({ message: "Server not found" });
//     }

//     const channel = await db.channel.findFirst({
//       where: {
//         id: channelId as string,
//       }
//     });

//     if (!channel) {
//       return res.status(404).json({ message: "Channel not found" });
//     }

//     const member = server.Member.find((member) => member.userProfileId === profile.id);

//     if (!member) {
//       return res.status(404).json({ message: "Member not found" });
//     }

//     const message = await db.message.create({
//       data: {
//         content,
//         attachment: false,
//         channelId: channelId as string,
//         userProfileId: profile.id,
//         memberId: member.id
//       },
//       include: {
//         userProfile: true
//         }
//     });

//     const channelKey = `chat:${channelId}:messages`;

//     res?.socket?.server?.io?.emit(channelKey, message);

//     return res.status(200).json(message);
//   } catch (error) {
//     console.log("[MESSAGES_POST]", error);
//     return res.status(500).json({ message: "Internal Error" }); 
//   }
// }