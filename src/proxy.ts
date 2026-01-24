import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { UserRole } from './types/user/user.interface';
import { getDefaultDashboardRoute, getRouteOwner, isAuthRoute } from './lib/auth-utils';
import jwt, { JwtPayload } from 'jsonwebtoken';



export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    /* -------------------------------
       Read token from cookies
    -------------------------------- */
    const accessToken = request.cookies.get("accessToken")?.value;

    let userRole: UserRole | null = null;

    if (accessToken) {
        try {
            const decoded = jwt.verify(
                accessToken,
                process.env.JWT_ACCESS_SECRET as string
            ) as JwtPayload;

            userRole = decoded.role as UserRole;
        } catch {
            const response = NextResponse.redirect(
                new URL("/login", request.url)
            );

            response.cookies.delete("accessToken");
            response.cookies.delete("refreshToken");

            return response;
        }
    }


    const routeOwner = getRouteOwner(pathname);
    const isAuth = isAuthRoute(pathname);

    /* -------------------------------
       Logged-in user → auth pages
    -------------------------------- */
    if (accessToken && isAuth) {
        return NextResponse.redirect(
            new URL(getDefaultDashboardRoute(userRole!), request.url)
        );
    }

    /* -------------------------------
       Public routes
    -------------------------------- */
    if (routeOwner === null) {
        return NextResponse.next();
    }

    /* -------------------------------
       Protected routes (not logged in)
    -------------------------------- */
    if (!accessToken) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
    }

    /* -------------------------------
       Common routes
    -------------------------------- */
    if (routeOwner === "COMMON") {
        return NextResponse.next();
    }

    /* -------------------------------
       Role-based routes
    -------------------------------- */
    if (
        routeOwner === "ADMIN" ||
        routeOwner === "MEMBER" ||
        routeOwner === "MENTOR"
    ) {
        if (userRole !== routeOwner) {
            return NextResponse.redirect(
                new URL(getDefaultDashboardRoute(userRole!), request.url)
            );
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
    ],
};
