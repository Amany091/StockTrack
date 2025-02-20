import { NextResponse } from "next/server";

export async function GET() {
    const response = NextResponse.redirect("/auth/login");
    response.cookies.set("access_token", "", {
        path: "/",
        expires: new Date(0),
    })
    return response

}