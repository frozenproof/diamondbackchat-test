import { currentUserProfile } from "@/lib/current-profile";
import { AccessToken } from "livekit-server-sdk";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const room = req.nextUrl.searchParams.get("room");
  const username = req.nextUrl.searchParams.get("username");
  var username2; 
  if (!room) {
    return NextResponse.json(
      { error: 'Missing "room" query parameter' },
      { status: 400 }
    );
  } else if (!username) {
    // return NextResponse.json(
    //   { error: 'Missing "username" query parameter' },
    //   { status: 400 }
    // );
    username2 = await currentUserProfile();
  }

  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;
  const wsUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;

  if (!apiKey || !apiSecret || !wsUrl) {
    return NextResponse.json(
      { error: "Server misconfigured" },
      { status: 500 }
    );
  }

  if(username)
  {
    console.log("live kit api route for user name",username);

    const at = new AccessToken(apiKey, apiSecret, { identity: username });

    at.addGrant({ room, roomJoin: true, canPublish: true, canSubscribe: true });
  
    return NextResponse.json({ token: await at.toJwt() });
  } 
  else
  {
    console.log("live kit api route",username2);
    const at = new AccessToken(apiKey, apiSecret, { identity: username2?.name });

    at.addGrant({ room, roomJoin: true, canPublish: true, canSubscribe: true });
  
    return NextResponse.json({ token: await at.toJwt() });
  }

}