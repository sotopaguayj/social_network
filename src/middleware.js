import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const tkn = request.cookies.get("LoginToken");
  if (!tkn) return NextResponse.redirect(new URL("/login", request.url));
  try {
    const { payload } = await jwtVerify(
      tkn,
      new TextEncoder().encode("sapoperrox")
    );
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/root/:path*", "/", "/mod/:path*"],
};
