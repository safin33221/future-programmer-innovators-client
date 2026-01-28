// services/admin/admin.service.ts
import { serverFetch } from "@/lib/serverFetch";
import { IInputErrorState } from "@/types/action";

export async function createAdmin(
    prevState: IInputErrorState | null,
    formData: FormData
): Promise<IInputErrorState> {
    try {
        const userId = formData.get("userId") as string;
        const role = formData.get("role") as string || "admin";

        if (!userId) {
            return {
                success: false,
                message: "Please select a user first",
            };
        }

        // Call API to make user admin
        const response = await serverFetch.post("/admins", {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId, role }),
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: data.message || "Failed to make admin",
            };
        }

        return {
            success: true,
            message: data.message || "User promoted to admin successfully",
        };
    } catch (error) {
        console.error("Create admin error:", error);
        return {
            success: false,
            message: "Something went wrong. Please try again.",
        };
    }
}