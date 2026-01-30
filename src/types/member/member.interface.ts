export type ApplicationStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface IMemberApplication {
    /* ===============================
       CORE
    =============================== */
    id: string;
    status: ApplicationStatus;
    studentId: string;

    createdAt: string;
    updatedAt: string;
    phoneNumber: string;

    profileImage?: string | null;

    /* ===============================
       USER
    =============================== */
    user: {
        id?: string;
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber?: string
    };

    /* ===============================
       RELATIONS
    =============================== */
    department?: {
        id?: string;
        name: string;
    } | null;

    session?: {
        id?: string;
        name: string;
    } | null;

    learningTrack?: {
        id: string;
        name: string;
    } | null;

    /* ===============================
       APPLICATION DATA
    =============================== */
    joinMotivation?: string | null;

    interestedAreas: string[];

    /* ===============================
       REVIEW DATA
    =============================== */
    reviewComment?: string | null;
    reviewedAt?: string | null;
}
