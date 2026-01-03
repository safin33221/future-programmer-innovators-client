export type IUserRole = "ADMIN" | "MEMBER" | "MENTOR" | "GUEST"

export interface IUserInfo {
    email: string;
    role: string
}