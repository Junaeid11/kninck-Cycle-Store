import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthService";

type Role = "admin" | "customer";

const authRoutes = ["/login", "/register"];

const roleBasedPrivateRoutes = {
  customer: [/^\/customer/, /^\/dashboard\/customer/],
  admin: [/^\/admin/, /^\/dashboard\/admin/],
};

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const userInfo = await getCurrentUser();

  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`/login?redirectPath=${pathname}`, request.nextUrl.origin)
      );
    }
  }
  if (authRoutes.includes(pathname)) {
    const redirectUrl =
      userInfo.role === "admin"
        ? "/dashboard/admin"
        : "/dashboard/customer";

    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }
  if (userInfo?.role && roleBasedPrivateRoutes[userInfo.role as Role]) {
    const allowedRoutes = roleBasedPrivateRoutes[userInfo.role as Role];
    if (allowedRoutes.some((route) => route.test(pathname))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
};

export const config = {
  matcher: [
    "/login",
    "/register",
    "/admin/:path*",
    "/customer/:path*",
    "/dashboard/:path*",
  ],
};
