import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const token = request.cookies.get("token")?.value;

  if (!token) {
    if (url.pathname.startsWith("/admin") || url.pathname.startsWith("/owner")) {
      url.pathname = "/customer/signin";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  try {
    // ✅ Verify token using jose
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload }: any = await jwtVerify(token, secret);

    //    url.searchParams.set("debug", JSON.stringify(payload));
    //  return NextResponse.redirect(url);


    const roleId = parseInt(payload.user?.roleid);


    if (url.pathname.startsWith("/admin") && roleId !== 1) {
      url.pathname = "/unauthorized";
      return NextResponse.redirect(url);
    }

    // if (url.pathname.startsWith("/owner") && roleId !== 2) {
    //   url.pathname = "/unauthorized";
    //   return NextResponse.redirect(url);
    // }


    if (url.pathname.startsWith("/owner")) {

      // 1️⃣ Allow /owner/verification for everyone
      if (url.pathname === "/owner/verification") {
        return NextResponse.next();
      }

      // 2️⃣ For all other /owner/* routes → require roleId = 2
      if (roleId !== 2) {
        url.pathname = "/unauthorized";
        return NextResponse.redirect(url);
      }
    }



    return NextResponse.next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    url.pathname = "/customer/signin";
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/admin/:path*", "/owner/:path*"],
};
