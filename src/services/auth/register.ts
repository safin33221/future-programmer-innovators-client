/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/serverFetch";
import { login } from "./login";

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

        if (result.success) {
            const loginFormData = new FormData()
            loginFormData.append("email", payload.email)
            loginFormData.append("password", payload.password)
            await login(_currentData, loginFormData)

        }

        return {
            success: true,
            data: result,
        };
    } catch (error: any) {
        if (error?.digest?.startsWith("NEXT_REDIRECT")) {
            throw error;
        }

        return {
            success: false,
            message: error.message || "Registration failed"
        };
    }
};
