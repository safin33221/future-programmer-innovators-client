/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/serverFetch";

/* ================= SEND OTP ================= */
export async function sendOtp(_: any, formData: FormData) {
    const email = formData.get("email");

    if (typeof email !== "string") {
        return { success: false, error: "Invalid email" };
    }

    const res = await serverFetch.post("/otp/auth/send", {
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
        cache: "no-store",
    });

    // const contentType = res.headers.get("content-type");

    // if (!res.ok || !contentType?.includes("application/json")) {
    //     console.error("SEND OTP ERROR:", await res.text());
    //     return { success: false, error: "Failed to send OTP" };
    // }
    const result = await res.json();


    if (!result.success) {
        return { success: false, error: result.message || "Failed to send OTP" };
    }

    return {
        success: true,
        email,
    };
}

/* ================= VERIFY OTP ================= */
export async function verifyOtp(_: any, formData: FormData) {
    const email = formData.get("email");
    const otp = formData.get("otp");

    if (typeof email !== "string" || typeof otp !== "string") {
        return { success: false, error: "Invalid data" };
    }

    const res = await serverFetch.post("/otp/auth/verify", {
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
        cache: "no-store",
    });

    const contentType = res.headers.get("content-type");

    if (!res.ok || !contentType?.includes("application/json")) {
        console.error("VERIFY OTP ERROR:", await res.text());
        return { success: false, error: "Invalid OTP" };
    }

    const data = await res.json();

    if (!data.success) {
        return { success: false, error: data.message || "Invalid OTP" };
    }

    return {
        success: true,
        verifiedToken: data.verifiedToken,
        email,
    };
}
