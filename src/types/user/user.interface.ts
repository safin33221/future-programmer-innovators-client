export type IUserRole = "ADMIN" | "MEMBER" | "MENTOR" | "GUEST"

export interface IUserInfo {
    name?: string | "Unknown User"
    email: string;
    role: string
}