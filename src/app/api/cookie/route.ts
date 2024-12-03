import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const cookie = request.cookies.get("access_token")?.value || null

    
    if(!cookie) NextResponse.json({error: "Token not exist , login again"})
    return NextResponse.json({token: cookie})
}