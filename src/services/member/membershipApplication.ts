/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/serverFetch";
import { revalidatePath } from "next/cache";

export async function submitMembershipApplication(
    prevState: any,
    formData: FormData
) {
    try {
        const payload = {
            firstName: formData.get("firstName") as string,
            lastName: formData.get("lastName") as string,
            email: formData.get("email") as string,
            studentId: formData.get("studentId") as string,
            departmentId: formData.get("departmentId") as string,
            sessionId: formData.get("sessionId") as string,
            motivation: formData.get("joinMotivation") as string,
            userId: formData.get("userId") as string,


            // ✅ IMPORTANT: multiple checkbox values
            interests: formData.getAll("interests") as string[],
        };



        const res = await serverFetch.post("/member/create-member-application", {
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(payload),
        })

        const result = await res.json();

        if (!res.ok || !result.success) {
            return {
                success: false,
                message: result.message || "Application submission failed",
            };
        }

        revalidatePath("/membership-application");

        return {
            success: true,
            message: "Your membership application has been submitted successfully.",
        };
    } catch {
        return {
            success: false,
            message: "Something went wrong. Please try again.",
        };
    }
}
