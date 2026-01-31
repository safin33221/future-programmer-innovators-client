"use server";

import { serverFetch } from "@/lib/serverFetch";

export type GetAllUserParams = {
    searchTerm?: string;
    role?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
};

export const getAllUser = async (queryString?: string) => {
    try {
        const searchParams = new URLSearchParams(queryString);

        const page = searchParams.get("page") || "1";
        const searchTerm = searchParams.get("searchTerm") || "all";

        const res = await serverFetch.get(
            `/user?${queryString ?? ""}`,
            {
                next: {
                    tags: [
                        "admins-list",
                        `admins-page-${page}`,
                        `admins-search-${searchTerm}`,
                    ],
                    revalidate: 180,
                },
            }
        );

        return await res.json();
    } catch (error) {
        console.error("Get users error:", error);
        throw error;
    }
};


export const getMe = async () => {
    try {
        const res = await serverFetch.get("/user/me");
        const result = await res.json();
        return result;
    } catch (error) {
        console.error("Get me error:", error);
        throw error;
    }
};


export const updateUser = async (data: FormData) => {
    try {
        const res = await serverFetch.patch("/user/update", {
            body: data, // ✅ send FormData directly
            cache: "no-store",
        });

        const result = await res.json();

        if (!result.success) {
            throw new Error(result.message || "Update failed");
        }

        return result;
    } catch (error) {
        console.error("Update user error:", error);
        throw error;
    }
};


export const softDelete = async (id: string) => {
    try {
        const res = await serverFetch.patch(`/user/soft-delete/${id}`);
        return await res.json();
    } catch (error) {
        console.error("Soft delete user error:", error);
        throw error;
    }
};
