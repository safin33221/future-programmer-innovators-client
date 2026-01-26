/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/serverFetch";
import { IInputErrorState } from "@/types/action";

/* =========================
   Types
========================= */

export interface CreateLearningTrackPayload {
    name: string;
    shortDesc: string;
    longDesc: string;
    icon?: string;
    difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
    duration: string;

    topics: {
        title: string;
        order: number;
    }[];

    roadmaps: {
        phase: string;
        description: string;
        order: number;
    }[];

    careers: {
        role: string;
        details: string;
    }[];

    tools: {
        name: string;
        icon?: string;
    }[];
}

export interface LearningTrack {
    id: string;
    name: string;
    slug: string;
    shortDesc: string;
    longDesc: string;
    icon?: string | null;
    difficulty: string;
    duration: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

/* =========================
   Create Learning Track (Admin)
========================= */

export const createLearningTrack = async (
    _prevState: IInputErrorState | null,
    formData: FormData
): Promise<IInputErrorState> => {
    try {
        /* =========================
           BASIC FIELDS
        ========================= */
        const payload: CreateLearningTrackPayload = {
            name: formData.get("name") as string,
            shortDesc: formData.get("shortDesc") as string,
            longDesc: formData.get("longDesc") as string,
            duration: formData.get("duration") as string,
            difficulty: formData.get("difficulty") as any,

            topics: [],
            roadmaps: [],
            careers: [],
            tools: [],
        };

        /* =========================
           OPTIONAL ICON FIELD
        ========================= */
        const icon = formData.get("icon");
        if (icon) {
            payload.icon = icon as string;
        }

        /* =========================
           TOPICS
        ========================= */
        let i = 0;
        while (formData.get(`topics[${i}].title`)) {
            payload.topics.push({
                title: formData.get(`topics[${i}].title`) as string,
                order: i + 1,
            });
            i++;
        }

        /* =========================
           ROADMAPS
        ========================= */
        i = 0;
        while (formData.get(`roadmaps[${i}].phase`)) {
            payload.roadmaps.push({
                phase: formData.get(`roadmaps[${i}].phase`) as string,
                description: formData.get(`roadmaps[${i}].description`) as string,
                order: i + 1,
            });
            i++;
        }

        /* =========================
           CAREERS
        ========================= */
        i = 0;
        while (formData.get(`careers[${i}].role`)) {
            payload.careers.push({
                role: formData.get(`careers[${i}].role`) as string,
                details: formData.get(`careers[${i}].details`) as string,
            });
            i++;
        }

        /* =========================
           TOOLS
        ========================= */
        i = 0;
        while (formData.get(`tools[${i}].name`)) {
            const toolPayload: { name: string; icon?: string } = {
                name: formData.get(`tools[${i}].name`) as string,
            };

            const toolIcon = formData.get(`tools[${i}].icon`);
            if (toolIcon) {
                toolPayload.icon = toolIcon as string;
            }

            payload.tools.push(toolPayload);
            i++;
        }

        /* =========================
           API CALL 
        ========================= */
        const res = await serverFetch.post("/learning-tracks", {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            const error = await res.json();
            return {
                success: false,
                message: error.message || "Failed to create learning track",
                errors: error.errors,
                formData: payload,
            };
        }

        return {
            success: true,
            message: "Learning track created successfully",
        };
    } catch (error: any) {
        console.error("Create learning track error:", error);
        return {
            success: false,
            message: error.message || "Something went wrong",
        };
    }
};

/* =========================
   Get All Learning Tracks (Public)
========================= */
export const getAllLearningTracks = async (): Promise<LearningTrack[]> => {
    try {
        const res = await serverFetch.get("/learning-tracks");

        if (!res.ok) {
            throw new Error(`HTTP ${res.status}: Failed to fetch learning tracks`);
        }

        return await res.json();
    } catch (error: any) {
        console.error("Get all learning tracks error:", error);
        throw new Error(error.message || "Failed to fetch learning tracks");
    }
};

/* =========================
   Get All Learning Tracks (Admin)
========================= */
export const getAllLearningTracksForAdmin = async (): Promise<LearningTrack[] | null> => {
    try {
        const res = await serverFetch.get("/learning-tracks");

        const result = await res.json();

        if (!result.success) {
            throw new Error(`HTTP ${result.message}: Failed to fetch learning tracks for admin`);
        }
        return result.data
    } catch (error: any) {
        console.error("Get all learning tracks for admin error:", error);
        return null;
    }
};

/* =========================
   Get Single Learning Track
========================= */
export const getLearningTrackBySlug = async (slug: string): Promise<LearningTrack> => {
    try {
        const res = await serverFetch.get(`/learning-tracks/${slug}`);

        if (!res.ok) {
            throw new Error(`HTTP ${res.status}: Failed to fetch learning track`);
        }

        return await res.json();
    } catch (error: any) {
        console.error(`Get learning track by slug error (${slug}):`, error);
        throw new Error(error.message || "Failed to fetch learning track");
    }
};

/* =========================
   Update Learning Track
========================= */
export const updateLearningTrack = async (
    id: string,
    payload: Partial<CreateLearningTrackPayload>
): Promise<LearningTrack> => {
    try {
        const res = await serverFetch.patch(`/learning-tracks/${id}`, {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            throw new Error(`HTTP ${res.status}: Failed to update learning track`);
        }

        return await res.json();
    } catch (error: any) {
        console.error(`Update learning track error (${id}):`, error);
        throw new Error(error.message || "Failed to update learning track");
    }
};

/* =========================
   Soft Delete Learning Track
========================= */
export const softDeleteLearningTrack = async (id: string): Promise<{ success: boolean; message: string }> => {
    try {
        const res = await serverFetch.patch(`/learning-tracks/soft-delete/${id}`);
        const result = await res.json()

        if (!result.success) {
            throw new Error(`${result.message}: Failed to delete learning track`);
        }

        return result
    } catch (error: any) {
        console.error(`Delete learning track error (${id}):`, error);
        throw new Error(error.message || "Failed to delete learning track");
    }
};

/* =========================
   Toggle Active / Inactive
========================= */
export const toggleLearningTrackStatus = async (
    id: string,
    isActive: boolean
): Promise<LearningTrack> => {
    try {
        const res = await serverFetch.patch(`/learning-tracks/${id}/status`, {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ isActive }),
        });

        if (!res.ok) {
            throw new Error(`HTTP ${res.status}: Failed to update learning track status`);
        }

        return await res.json();
    } catch (error: any) {
        console.error(`Toggle learning track status error (${id}):`, error);
        throw new Error(error.message || "Failed to update learning track status");
    }
};