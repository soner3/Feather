import { NextResponse, type NextRequest } from "next/server";
import { isTokenExpired } from "./data/authData";

export function middleware(request: NextRequest) {
  // const refreshToken = request.cookies.get("feather_refresh")?.value;
  // if (refreshToken) {
  //   const isExpired = isTokenExpired(refreshToken);
  //   if (isExpired) {
  //     return NextResponse.redirect(new URL("/auth/login/", request.url));
  //   } else {
  //     return NextResponse.next();
  //   }
  // } else {
  //   return NextResponse.redirect(new URL("/auth/login/", request.url));
  // }
}

export const config = {
  matcher: ["/"],
};
