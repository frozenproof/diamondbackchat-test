import { createRouteHandler } from "uploadthing/next";
 
import { ourUniqueFileRouter } from "./core";
 
// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourUniqueFileRouter,
});