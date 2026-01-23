export type AdminLevel = "BASIC" | "MODERATOR" | "SUPER_ADMIN";




export interface IAdmin {
    id: string;
    userId: string;
    adminLevel: AdminLevel;
    profileImage?: string;
}
