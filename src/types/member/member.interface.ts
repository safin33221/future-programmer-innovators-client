
export interface IMemberApplication {
    id: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    studentId: string;
    createdAt: string;
    updatedAt: string;
    profileImage?: string

    user: {
        firstName: string;
        lastName: string;
        email: string;
    };

    department?: {
        name: string;
    } | null;

    session?: {
        name: string;
    } | null;

    learningTrackId?: string | null;
}