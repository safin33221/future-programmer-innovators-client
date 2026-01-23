import { UserRole } from "@/types/user/user.interface";




export const getDefaultDashboardRoute = (role: UserRole) => {
    switch (role) {
        case "ADMIN":
            return '/admin/dashboard';
        case "MEMBER":
            return '/member/dashboard';
        case "MENTOR":
            return '/mentor/dashboard';
        case "GUEST":
            return '/membership-application';
        default:
            return '/login';
    }
};