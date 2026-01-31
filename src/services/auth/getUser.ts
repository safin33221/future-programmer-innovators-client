/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/serverFetch";
import { UserInfo } from "@/types/user/user.interface";
import jwt, { JwtPayload } from "jsonwebtoken";
import { deleteCookies, getCookies } from "./tokenHandler";


export const getUserInfo = async (): Promise<UserInfo | null> => {
    try {
        // 1️⃣ Fetch user from backend (SOURCE OF TRUTH)
        const response = await serverFetch.get("/user/me");

        const result = await response.json();

        if (!result?.success || !result?.data) {
            return null;
        }

        let userInfo: UserInfo = result.data;

        // 2️⃣ OPTIONAL: enrich from JWT (SAFE, NON-BLOCKING)
        const accessToken = await getCookies("accessToken");

        if (accessToken) {
            try {
                const cleanedToken = accessToken.startsWith("Bearer ")
                    ? accessToken.replace("Bearer ", "")
                    : accessToken;

                const decoded = jwt.verify(
                    cleanedToken,
                    process.env.JWT_ACCESS_SECRET as string
                ) as JwtPayload;

                userInfo = {
                    ...userInfo,
                    email: decoded.email ?? userInfo.email,
                    role: decoded.role ?? userInfo.role,
                    lastLoginAt: decoded.lastLoginAt ?? userInfo.lastLoginAt,
                };
            } catch {
                // ❌ Invalid or expired token → cleanup only
                await deleteCookies("accessToken");
                await deleteCookies("refreshToken");
            }
        }

        return userInfo;
    } catch (error: any) {
        console.error("getUserInfo error:", error);
        return null

    }
};
