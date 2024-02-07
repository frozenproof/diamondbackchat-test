import { PrismaClient } from "@prisma/client/extension";

declare global  {
    var prisma: PrismaClient    |   undefined

};

//do not do this in production 
//in production , we only create a new instance, assuming we are hosting 
//in development , to avoid creating too many instances , we use the same instance of prisma , which avoid host reload  
//global will avoid host reload

export const db = globalThis.prisma  || new PrismaClient();

if(process.env.NODE_ENV !=="production") 
    globalThis.prisma = db