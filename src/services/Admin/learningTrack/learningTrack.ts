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
            payload.tools.push({
                name: formData.get(`tools[${i}].name`) as string,
            });
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
                message: error.message,
                errors: error.errors,
                formData: payload,
            };
        }

        return {
            success: true,
            message: "Learning track created successfully",
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Something went wrong",
        };
    }
};


/* =========================
   Get All Learning Tracks (Public)
========================= */
export const getAllLearningTracks = async () => {
    const res = await serverFetch.get("/learning-tracks");

    if (!res.ok) {
        throw new Error("Failed to fetch learning tracks");
    }

    return res.json();
};

/* =========================
   Get All Learning Tracks (Admin)
========================= */
export const getAllLearningTracksForAdmin = async () => {
    try {
        const res = await serverFetch.get("/learning-tracks");

        if (!res.ok) {
            throw new Error("Failed to fetch learning tracks for admin");
        }

        const result = await res.json();
        return result
    } catch (error) {
        console.log(error);
    }
};

/* =========================
   Get Single Learning Track
========================= */
export const getLearningTrackBySlug = async (slug: string) => {
    const res = await serverFetch.get(`/learning-tracks/${slug}`);

    if (!res.ok) {
        throw new Error("Failed to fetch learning track");
    }

    return res.json();
};

/* =========================
   Update Learning Track
========================= */
export const updateLearningTrack = async (
    id: string,
    payload: Partial<CreateLearningTrackPayload>
) => {
    const res = await serverFetch.patch(`/learning-tracks/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        throw new Error("Failed to update learning track");
    }

    return res.json();
};

/* =========================
   Soft Delete Learning Track
========================= */
export const deleteLearningTrack = async (id: string) => {
    const res = await serverFetch.delete(`/learning-tracks/${id}`);

    if (!res.ok) {
        throw new Error("Failed to delete learning track");
    }

    return res.json();
};

/* =========================
   Toggle Active / Inactive
========================= */
export const toggleLearningTrackStatus = async (
    id: string,
    isActive: boolean
) => {
    const res = await serverFetch.patch(
        `/learning-tracks/${id}/status`,
        {
            body: JSON.stringify({ isActive }),
        }
    );

    if (!res.ok) {
        throw new Error("Failed to update learning track status");
    }

    return res.json();
};
