"use server";

import { serverFetch } from "@/lib/serverFetch";
import { parse } from "cookie";
import jwt, { JwtPayload } from "jsonwebtoken";
import { setCookie } from "./tokenHandler";
/* eslint-disable @typescript-eslint/no-explicit-any */
export const login = async (
    _currentData: any,
    formData: FormData
): Promise<{
    success: boolean;
    message?: string;
    data?: any;
}> => {

    let accessTokenObject: null | any = null;
    let refreshTokenObject: null | any = null;
    try {
        const payload = {
            email: String(formData.get("email")),
            password: String(formData.get("password")),
        };

        const res = await serverFetch.post("/auth/login", {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const result = await res.json();
        console.log(result);

        if (!res.ok) {
            return {
                success: false,
                message: result?.message || "Invalid credentials",
            };
        }
        const setCookieHeaders = res.headers.getSetCookie();

        if (setCookieHeaders && setCookieHeaders.length > 1) {
            setCookieHeaders.forEach((cookie: string) => {

                const parseCookie = parse(cookie)
                if (parseCookie['accessToken']) {
                    accessTokenObject = parseCookie
                }
                if (parseCookie['refreshToken']) {
                    refreshTokenObject = parseCookie
                }
            })
        } else {
            throw new Error("No Set-Cookie header found");
        }

        if (!accessTokenObject) {
            throw new Error("Tokens not found in cookies");
        }

        if (!refreshTokenObject) {
            throw new Error("Tokens not found in cookies");
        }
        const isProd = process.env.NODE_ENV === "production";
        await setCookie("accessToken", accessTokenObject.accessToken, {
            httpOnly: true,
            secure: isProd,               // ❗ FIX
            sameSite: isProd ? "none" : "lax", // ❗ FIX
            path: "/",
            maxAge: Number(accessTokenObject["Max-Age"]) || 3600,
        });

        await setCookie("refreshToken", refreshTokenObject.refreshToken, {
            httpOnly: true,
            secure: isProd,
            sameSite: isProd ? "none" : "lax",
            path: "/",
            maxAge: Number(accessTokenObject["Max-Age"]) || 7776000,
        });
        

        return {
            success: true,
            data: result,
        };
    } catch (error) {
        console.error("Login error:", error);
        return {
            success: false,
            message: "Something went wrong",
        };
    }
};
