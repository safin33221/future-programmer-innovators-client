/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/serverFetch";

export const register = async (
    _currentData: any,
    formData: FormData
): Promise<any> => {
    try {
        const payload = {
            firstName: String(formData.get("firstName")),
            lastName: String(formData.get("lastName")),
            email: String(formData.get("email")),
            password: String(formData.get("password")),
        };


        const res = await serverFetch.post('/user/registration', {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })

        const result = await res.json();
 

        if (!res.ok) {
            return {
                success: false,
                message: result?.message || "Registration failed",
            };
        }

        return {
            success: true,
            data: result,
        };
    } catch (error) {
        console.error("Register error:", error);
        return {
            success: false,
            message: "Something went wrong",
        };
    }
};
