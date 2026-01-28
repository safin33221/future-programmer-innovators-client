/* eslint-disable @typescript-eslint/no-explicit-any */
// services/user/user.action.ts
"use server";

import { serverFetch } from "@/lib/serverFetch";
import { IInputErrorState } from "@/types/action";

export async function createUserByRole(
    _prevState: IInputErrorState,
    formData: FormData
): Promise<IInputErrorState> {
    try {
        const role = formData.get("role") as string;

        /* ---------- BASE PAYLOAD ---------- */
        let payload: Record<string, any> = {
            email: formData.get("email") as string,
            role,
        };

        /* ---------- ROLE SPECIFIC ---------- */
        switch (role) {
            case "ADMIN":
                payload = {
                    ...payload,
                    adminLevel: formData.get("adminLevel"),

                };
                break;

            case "MENTOR":
                payload = {
                    ...payload,
                    expertise: formData.get("expertise"),
                    designation: formData.get("designation"),
                    experience: formData.get("experience"),
                };
                break;

            case "MODERATOR":
                payload = {
                    ...payload,
                    // permissions: formData.getAll("permissions"),
                    assignedForums: formData.getAll("assignedForums"),
                };
                break;

            default:
                return {
                    success: false,
                    message: "Invalid role selected",
                };
        }

        console.log({ payload });
        /* ---------- API CALL ---------- */
        const res = await serverFetch.post(
            "/user/create-role-base-user",
            {
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),

            }
        );

        const data = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: data?.message || "Failed to create user",
                formData: payload,
            };
        }

        return {
            success: true,
            message: data.message || "User created successfully",
        };
    } catch (error) {
        console.error("createUserByRole error:", error);

        return {
            success: false,
            message: "Internal server error",
        };
    }
}
