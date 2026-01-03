import { INavSection } from "@/types/dashboard/dashboard.interface"
import { IUserRole } from "@/types/user/user.interface"

export const getCommonNavItem = (role: IUserRole): INavSection[] => {

    return [
        {
            title: "My Dashboard",
            items: [
                {
                    title: 'Dashboard',
                    href: "DefaultDashboard",
                    icon: "LayoutDashboard",
                    role: ["ADMIN", "MEMBER", "MENTOR"]
                },
                {
                    title: 'My Profile',
                    href: "/my-profile",
                    icon: "User",
                    role: ["ADMIN", "MEMBER", "MENTOR"]
                },

            ]
        },
        {
            title: "Setting",
            items: [
                {
                    title: "Change Password",
                    href: "/change-password",
                    icon: "Setting",
                    role: ["MEMBER", "MENTOR"],

                }
            ]
        }
    ]
}

export const adminNavItem: INavSection[] = [


    {
        title: "User Management",
        items: [
            {
                title: "Admin",
                href: "/admin/dashboard/admin-management",
                icon: "Shield",
                role: ["ADMIN"],

            },
            {
                title: "Member",
                href: "/admin/dashboard/member-management",
                icon: "Shield",
                role: ["ADMIN"],

            },
            {
                title: "Guest",
                href: "/admin/dashboard/guest-management",
                icon: "Shield",
                role: ["ADMIN"],

            },

        ]
    },
    {
        title: "Notice Management",
        items: [
            {
                title: "Notice",
                href: "/admin/dashboard/notice-management",
                icon: "Shield",
                role: ["ADMIN"],

            },


        ]
    }

]
export const memberNavItem: INavSection[] = []
export const mentorNavItem: INavSection[] = []
export const guestNavItem: INavSection[] = []






export const getNavItemByRole = (role: IUserRole) => {
    const commonNavItem = getCommonNavItem(role)

    switch (role) {
        case "ADMIN":
            return [...commonNavItem, ...adminNavItem]
        case "MEMBER":
            return [...commonNavItem, ...memberNavItem]

        case "MENTOR":
            return [...commonNavItem, ...mentorNavItem]
        case "GUEST":
            return [...commonNavItem, ...guestNavItem]
    }

}