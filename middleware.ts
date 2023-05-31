// export { default } from 'next-auth/middleware';
// export const config = { matcher: ['/my/:path*'] };
import { NextRequest, NextResponse } from "next/server";
export function middleware(request: NextRequest) {
    return NextResponse.next();
}