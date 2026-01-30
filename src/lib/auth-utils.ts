import { UserRole } from "@/types/user/user.interface";

/* --------------------------------
   Route Config Types
-------------------------------- */
export type RouteConfig = {
    exact: string[];
    patterns: RegExp[];
};

/* --------------------------------
   Auth Pages (Public)
-------------------------------- */
export const authRoutes: string[] = [
    "/login",
    "/register",
    "/forgot-password",
];

/* --------------------------------
   Common Protected Routes
   (Any logged-in user)
-------------------------------- */
export const commonProtectedRoutes: RouteConfig = {
    exact: [
        "/my-profile",
        "/settings",
        "/change-password",
        "/reset-password",
        "/membership-application",
    ],
    patterns: [],
};

/* --------------------------------
   Role-Based Protected Routes
-------------------------------- */
export const adminProtectedRoutes: RouteConfig = {
    exact: [],
    patterns: [/^\/admin(\/.*)?$/],
};

export const memberProtectedRoutes: RouteConfig = {
    exact: [],
    patterns: [/^\/member(\/.*)?$/],
};

export const mentorProtectedRoutes: RouteConfig = {
    exact: [],
    patterns: [/^\/mentor(\/.*)?$/],
};

/* --------------------------------
   Utils
-------------------------------- */
export const isAuthRoute = (pathname: string): boolean => {
    return authRoutes.includes(pathname);
};

export const isRouteMatches = (
    pathname: string,
    routes: RouteConfig
): boolean => {
    if (routes.exact.includes(pathname)) {
        return true;
    }
    return routes.patterns.some((pattern) => pattern.test(pathname));
};

/* --------------------------------
   Route Owner Resolver
-------------------------------- */
export const getRouteOwner = (
    pathname: string
): "ADMIN" | "MEMBER" | "MENTOR" | "COMMON" | null => {
    if (isRouteMatches(pathname, adminProtectedRoutes)) return "ADMIN";
    if (isRouteMatches(pathname, memberProtectedRoutes)) return "MEMBER";
    if (isRouteMatches(pathname, mentorProtectedRoutes)) return "MENTOR";
    if (isRouteMatches(pathname, commonProtectedRoutes)) return "COMMON";
    return null; // public route
};

/* --------------------------------
   Default Dashboard Redirect
-------------------------------- */
export const getDefaultDashboardRoute = (role: UserRole): string => {
    switch (role) {
        case "ADMIN":
            return "/admin/dashboard";
        case "MEMBER":
            return "/member/dashboard";
        case "MENTOR":
            return "/mentor/dashboard";
        case "GUEST":
            return "/guest/dashboard";
        default:
            return "/login";
    }
};
