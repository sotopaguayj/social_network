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

    switch (payload.role) {
      case 100:
        if (request.nextUrl.pathname == "/root") {
          return NextResponse.next();
        }
        return NextResponse.redirect(new URL("/root", request.url));
      case 111:
        if (request.nextUrl.pathname == "/mod") {
          return NextResponse.next();
        }
        return NextResponse.redirect(new URL("/mod", request.url));
      default:
        if (request.nextUrl.pathname == "/") {
          return NextResponse.next();
        }
        return NextResponse.redirect(new URL("/", request.url));
    }
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/root/:path*", "/", "/mod/:path*"],
};
