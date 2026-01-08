"use server";

import { serverFetch } from "@/lib/serverFetch";

type GetAllUserParams = {
    searchTerm?: string;
    role?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
};

export const getAllUser = async (params?: GetAllUserParams) => {
    try {
        const query = new URLSearchParams();

        if (params?.searchTerm) query.append("searchTerm", params.searchTerm);
        if (params?.role) query.append("role", params.role);
        if (params?.page) query.append("page", params.page.toString());
        if (params?.limit) query.append("limit", params.limit.toString());
        if (params?.sortBy) query.append("sortBy", params.sortBy);
        if (params?.sortOrder) query.append("sortOrder", params.sortOrder);

        const url = query.toString()
            ? `/user?${query.toString()}`
            : "/user";

        const res = await serverFetch.get(url);
        const result = await res.json();

        return result;
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

export const softDelete = async (id: string) => {
    try {
        const res = await serverFetch.patch(`/user/soft-delete/${id}`);
        return await res.json();
    } catch (error) {
        console.error("Soft delete user error:", error);
        throw error;
    }
};
