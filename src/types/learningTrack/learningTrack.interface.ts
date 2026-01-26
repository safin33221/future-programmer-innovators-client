/* eslint-disable @typescript-eslint/no-explicit-any */
/* ===============================
   ENUMS
================================ */

export type TrackLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

/* ===============================
   CREATE/UPDATE DTOs (Form Input)
================================ */


export interface CreateLearningTrackInputDTO {
    name: string;
    shortDesc: string;
    longDesc: string;
    duration: string;
    difficulty: TrackLevel;

    // Optional fields
    icon?: string;
    slug?: string;

    // Arrays from form
    topics: Array<{
        title: string;
        order: number;
    }>;

    roadmaps: Array<{
        phase: string;
        description: string;
        order: number;
    }>;

    careers: Array<{
        role: string;
        details: string;
    }>;

    tools: Array<{
        name: string;
        icon?: string;
    }>;
}

/* ===============================
   DATABASE MODELS (Prisma Schema)
================================ */

export interface ITrackTopic {
    id: string;
    trackId: string;
    title: string;
    order: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ITrackRoadmap {
    id: string;
    trackId: string;
    phase: string;
    description: string;
    order: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ITrackCareer {
    id: string;
    trackId: string;
    role: string;
    details: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ITrackTool {
    id: string;
    trackId: string;
    name: string;
    icon?: string;
    createdAt?: Date;
    updatedAt?: Date;
}


/* ===============================
   MAIN LEARNING TRACK
================================ */
export interface ILearningTrack {
    id: string;
    name: string;
    slug: string;
    shortDesc: string;
    longDesc: string;
    icon?: string;
    difficulty: TrackLevel;
    duration: string;
    isActive?: boolean;
    isDeleted: boolean;
    topics?: ITrackTopic[];
    roadmaps?: ITrackRoadmap[];
    careers?: ITrackCareer[];
    tools?: ITrackTool[];

    // Optional fields from relations
    members?: any[];
    applications?: any[];

    // Count fields (optional - comes from service layer)
    memberCount?: number;
    applicationCount?: number;
    topicCount?: number;
    roadmapCount?: number;
    careerCount?: number;
    toolCount?: number;

    createdAt?: Date;
    updatedAt?: Date;
}


/* ===============================
   API RESPONSE MODELS
================================ */


export interface LearningTrackResponse {
    id: string;
    name: string;
    slug: string;
    shortDesc: string;
    longDesc: string;
    icon?: string | null;
    difficulty: TrackLevel;
    duration: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;

    // Parsed JSON arrays
    topics: Array<{
        title: string;
        order: number;
    }>;

    roadmaps: Array<{
        phase: string;
        description: string;
        order: number;
    }>;

    careers: Array<{
        role: string;
        details: string;
    }>;

    tools: Array<{
        name: string;
        icon?: string;
    }>;

    // Counts (optional)
    memberCount?: number;
    applicationCount?: number;
}

export interface LearningTrackListItem {
    id: string;
    name: string;
    slug: string;
    shortDesc: string;
    icon?: string;
    difficulty: TrackLevel;
    duration: string;
    isActive: boolean;
    createdAt: Date;

    // Counts
    topicCount: number;
    roadmapCount: number;
    careerCount: number;
    toolCount: number;
    memberCount: number;
    applicationCount: number;
}

/* ===============================
   FORM STATE MODELS
================================ */

export interface LearningTrackFormData {
    name: string;
    shortDesc: string;
    longDesc: string;
    duration: string;
    difficulty: TrackLevel;
    icon?: string;
    slug?: string;

    topics: Array<{
        id?: string;
        title: string;
        order: number;
    }>;

    roadmaps: Array<{
        id?: string;
        phase: string;
        description: string;
        order: number;
    }>;

    careers: Array<{
        id?: string;
        role: string;
        details: string;
    }>;

    tools: Array<{
        id?: string;
        name: string;
        icon?: string;
    }>;
}

/* ===============================
   SERVICE FUNCTIONS TYPES
================================ */

export interface CreateLearningTrackPayload {
    name: string;
    slug?: string;
    shortDesc: string;
    longDesc: string;
    duration: string;
    difficulty: TrackLevel;
    icon?: string;
    isActive?: boolean;

    // Arrays directly from form
    topics: Array<{ title: string; order: number }>;
    roadmaps: Array<{ phase: string; description: string; order: number }>;
    careers: Array<{ role: string; details: string }>;
    tools: Array<{ name: string; icon?: string }>;
}

export interface UpdateLearningTrackPayload {
    name?: string;
    slug?: string;
    shortDesc?: string;
    longDesc?: string;
    duration?: string;
    difficulty?: TrackLevel;
    icon?: string;
    isActive?: boolean;

    // Arrays (replace existing)
    topics?: Array<{ id?: string; title: string; order: number }>;
    roadmaps?: Array<{ id?: string; phase: string; description: string; order: number }>;
    careers?: Array<{ id?: string; role: string; details: string }>;
    tools?: Array<{ id?: string; name: string; icon?: string }>;
}

/* ===============================
   API RESPONSE WRAPPERS
================================ */

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    error?: string;
    meta?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export interface PaginatedResponse<T> {
    data: T[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

/* ===============================
   FILTER/SORT TYPES
================================ */

export interface LearningTrackFilters {
    searchTerm?: string;
    difficulty?: TrackLevel;
    isActive?: boolean;
    duration?: string;
}

export interface PaginationOptions {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

/* ===============================
   EXAMPLE USAGE
================================ */

