/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/serverFetch";
import { IInputErrorState } from "@/types/action";







/* =========================
   Create Session
========================= */
export const createSession = async (
    _prevState: IInputErrorState | null,
    formData: FormData
): Promise<IInputErrorState> => {
    try {
        const payload = {
            name: formData.get("name") as string,
        };


        const res = await serverFetch.post("/sessions", {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const result = await res.json();

        if (!res.ok || result.success === false) {
            return {
                success: false,
                message: result.message,
                errors: result.errors,
                formData: payload,
            };
        }

        return {
            success: true,
            message: "Session created successfully",
        };
    } catch {
        return {
            success: false,
            message: "Something went wrong",
        };
    }
};

/* =========================
   Get All Sessions
========================= */
export const getAllSessions = async () => {
    try {
        const res = await serverFetch.get("/sessions");
        const result = await res.json();

        if (!res.ok) {
            throw new Error("Failed to fetch Sessions");
        }
        return result
    } catch (error) {
        console.log(error);
    }

};

/* =========================
   Soft Delete Session
========================= */
export const softDeleteSession = async (id: string) => {
    const res = await serverFetch.patch(`/sessions/${id}`);
    const result = await res.json();

    if (!res.ok || result.success === false) {
        throw new Error(result.message || "Failed to delete session");
    }

    return result;
};
