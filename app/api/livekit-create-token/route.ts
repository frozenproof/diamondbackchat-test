import { AccessToken } from "livekit-server-sdk";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  console.log("livekit is running") 
  const room = req.nextUrl.searchParams.get("room");
  const username = req.nextUrl.searchParams.get("username");
  if (!room) {
    return NextResponse.json({ error: 'Missing "room" query parameter' }, { status: 400 });
  } else if (!username) {
    return NextResponse.json({ error: 'Missing "username" query parameter' }, { status: 400 });
  }

  console.log("room id",room);
  console.log("username",username);

  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;
  const wsUrl = process.env.NEXT_PUBLIC_LIVEKIT_WS_URL;

  console.log("apiKey",apiKey);
  console.log("apiSecret",apiSecret);
  console.log("wsUrl",wsUrl);
  if (!apiKey || !apiSecret || !wsUrl) {
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  const at = new AccessToken(apiKey, apiSecret, { identity: username });

  at.addGrant({ room, roomJoin: true, canPublish: true, canSubscribe: true });
  const realToken = await at.toJwt()
  console.log("token is ",at);
  console.log("token is ",realToken);
  return NextResponse.json(realToken);
}