/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/serverFetch";
import { IInputErrorState } from "@/types/action";



/* =========================
   Types
========================= */
export interface CreateNoticePayload {
    title: string;
    content?: string;
}

export interface Notice {
    id: string;
    title: string;
    content?: string | null;
    published: boolean;
    publishedAt?: string | null;
    createdAt: string;
    updatedAt: string;
}

/* =========================
   Create Notice (Admin)
========================= */
export const createNotice = async (
    _prevState: IInputErrorState | null,
    formData: FormData
): Promise<IInputErrorState> => {
    try {
        const payload = {
            title: formData.get("title") as string,
            content: formData.get("content") as string,
        };

        const res = await serverFetch.post("/notices", {
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            const error = await res.json();

            return {
                success: false,
                message: error.message,
                errors: error.errors,
                formData: payload,
            };
        }



        return {
            success: true,
            message: "Notice created successfully",
        };
    } catch {
        return {
            success: false,
            message: "Something went wrong",
        };
    }
};

/* =========================
   Get All Notices
========================= */
export const getAllPublishedNotices = async () => {
    const res = await serverFetch.get("/notices");

    if (!res.ok) {
        throw new Error("Failed to fetch notices");
    }

    return res.json();
};


/* =========================
   Get All Notices For admin
========================= */

export const getAllNoticesForAdmin = async () => {
    const res = await serverFetch.get("/notices/admin");

    if (!res.ok) {
        throw new Error("Failed to fetch notices for admin");
    }

    return res.json();
};


/* =========================
   Get Single Notice
========================= */
export const getNoticeById = async (id: string) => {
    const res = await serverFetch.get(`/notices/${id}`);

    if (!res.ok) {
        throw new Error("Failed to fetch notice");
    }

    return res.json();
};

/* =========================
   Delete Notice
========================= */
export const deleteNotice = async (id: string) => {
    const res = await serverFetch.delete(`/notices/${id}`);

    if (!res.ok) {
        throw new Error("Failed to delete notice");
    }

    return res.json();
};

/* =========================
   Publish / Unpublish Notice
========================= */
export const toggleNoticePublish = async (
    id: string,
    published: boolean
) => {
    const res = await serverFetch.patch(`/notices/${id}/publish`, {
        body: JSON.stringify({ published }),
    });

    if (!res.ok) {
        throw new Error("Failed to update notice status");
    }

    return res.json();
};
