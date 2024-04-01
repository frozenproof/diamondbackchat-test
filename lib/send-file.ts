"use server"

import { db } from "./db";

interface fileInterfaceProps
{
    url: string;
    type: string;
}
interface sendFileExtraProps  
{
    channelIdFile: string;
    userIdFile: string;
    typeSend: "sentMem" | "direct"
    resProp: fileInterfaceProps[]
}
export const sendFileExtra = async({
    channelIdFile,
    userIdFile,
    typeSend,
    resProp
}:  sendFileExtraProps) =>{
    
   console.log("",channelIdFile);
   console.log("",userIdFile);
   console.log("",typeSend);
   console.log("res",resProp);

   if(typeSend==="sentMem")
   {
    const channel = await db.channel.findFirst({
        where: {
          id: channelIdFile as string,
        }
      });
    
      if (!channel) {
        return null
      }
    
      const sendingFile = await db.message.create({
        data: {
          content:"",
          attachment: true,
          channelId: channelIdFile as string,
          memberId: userIdFile as string,
          isReply: false
        },
      });
    
      for(let i=0;i<resProp.length;i++)
      {
        const attachmentFile = await db.attachmentChannel.create({
            data: {
                messageId: sendingFile.id,
                channelId: channelIdFile as string,
                fileUrl: resProp[i].url as string,
                type: resProp[i].type as string
            }
          })
      }
    }


   return "";
}