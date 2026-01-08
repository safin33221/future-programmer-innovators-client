export type IUserRole = "ADMIN" | "MEMBER" | "MENTOR" | "GUEST"

export interface IUserInfo {
    name?: string | "Unknown User"
    email: string;
    role: string
}

export enum UserRole {
    GUEST = "GUEST",
    ADMIN = "ADMIN",
    MEMBER = "MEMBER",
    MENTOR = "MENTOR",
    MODERATOR = "MODERATOR",
}
export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: UserRole;
    isVerified: boolean;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    profilePhoto?: string;
    phone?: string

    // one-to-one profile relations
    // admin?: IAdmin | null;
    // student?: IStudent | null;
    // mentor?: IMentor | null;
    // moderator?: IModerator | null;

    // one-to-many relations
    // eventFeedbacks: IEventFeedback[];
    // eventRegistrations: IEventRegistration[];
    // events: IEvent[];
    // payments: IPayment[];
}