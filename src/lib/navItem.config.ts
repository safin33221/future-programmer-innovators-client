import { INavSection } from "@/types/dashboard/dashboard.interface"

import { getDefaultDashboardRoute } from "./auth-utils";
import { UserRole } from "@/types/user/user.interface";

/* ===================== COMMON ===================== */
export const getCommonNavItems = (role: UserRole): INavSection[] => {
    const defaultDashboard = getDefaultDashboardRoute(role);
    return [
        {
            title: "Dashboard",
            items: [
                {
                    title: "My Dashboard",
                    href: defaultDashboard,
                    icon: "LayoutDashboard",
                    role: ["ADMIN", "MEMBER", "MENTOR", "GUEST"],
                },
                {
                    title: "My Profile",
                    href: "/my-profile",
                    icon: "User",
                    role: ["ADMIN", "MEMBER", "MENTOR"],
                },
            ],
        },
        {
            title: "Settings",
            items: [
                {
                    title: "Change Password",
                    href: "/change-password",
                    icon: "Settings",
                    role: ["ADMIN", "MEMBER", "MENTOR"],
                },
            ],
        },
    ]
}

/* ===================== ADMIN ===================== */
export const adminNavItem: INavSection[] = [
    {
        title: "User Management",
        items: [
            {
                title: "Admins",
                href: "/admin/dashboard/admin-management",
                icon: "Shield",
                role: ["ADMIN"],
            },
            {
                title: "Members",
                href: "/admin/dashboard/member-management",
                icon: "Users",
                role: ["ADMIN"],
            },
            {
                title: "Mentors",
                href: "/admin/dashboard/mentor-management",
                icon: "UserCheck",
                role: ["ADMIN"],
            },
            {
                title: "Guests",
                href: "/admin/dashboard/guest-management",
                icon: "UserPlus",
                role: ["ADMIN"],
            },
        ],
    },
    {
        title: "Academic Management",
        items: [
            {
                title: "Courses",
                href: "/admin/dashboard/course-management",
                icon: "BookOpen",
                role: ["ADMIN"],
            },
            {
                title: "Department",
                href: "/admin/dashboard/department-management",
                icon: "BookOpen",
                role: ["ADMIN"],
            },
            {
                title: "Session",
                href: "/admin/dashboard/session-management",
                icon: "BookOpen",
                role: ["ADMIN"],
            },
            {
                title: "Batches / Sessions",
                href: "/admin/dashboard/batch-management",
                icon: "Calendar",
                role: ["ADMIN"],
            },
            {
                title: "Assignments",
                href: "/admin/dashboard/assignment-management",
                icon: "ClipboardList",
                role: ["ADMIN"],
            },
        ],
    },
    {
        title: "Content & Notice",
        items: [
            {
                title: "Notices",
                href: "/admin/dashboard/notice-management",
                icon: "Bell",
                role: ["ADMIN"],
            },
            {
                title: "Events",
                href: "/admin/dashboard/event-management",
                icon: "Megaphone",
                role: ["ADMIN"],
            },
        ],
    },
    {
        title: "Reports",
        items: [
            {
                title: "Attendance",
                href: "/admin/dashboard/attendance-report",
                icon: "BarChart",
                role: ["ADMIN"],
            },
            {
                title: "Performance",
                href: "/admin/dashboard/performance-report",
                icon: "TrendingUp",
                role: ["ADMIN"],
            },
        ],
    },
]

/* ===================== MEMBER ===================== */
export const memberNavItem: INavSection[] = [
    {
        title: "Learning",
        items: [
            {
                title: "My Courses",
                href: "/member/dashboard/my-courses",
                icon: "Book",
                role: ["MEMBER"],
            },
            {
                title: "Assignments",
                href: "/member/dashboard/assignments",
                icon: "ClipboardCheck",
                role: ["MEMBER"],
            },
            {
                title: "Attendance",
                href: "/member/dashboard/attendance",
                icon: "CalendarCheck",
                role: ["MEMBER"],
            },
        ],
    },
    {
        title: "Community",
        items: [
            {
                title: "Notices",
                href: "/member/dashboard/notices",
                icon: "Bell",
                role: ["MEMBER"],
            },
            {
                title: "Events",
                href: "/member/dashboard/events",
                icon: "Megaphone",
                role: ["MEMBER"],
            },
        ],
    },
]

/* ===================== MENTOR ===================== */
export const mentorNavItem: INavSection[] = [
    {
        title: "Teaching",
        items: [
            {
                title: "My Batches",
                href: "/mentor/dashboard/batches",
                icon: "Users",
                role: ["MENTOR"],
            },
            {
                title: "Assignments",
                href: "/mentor/dashboard/assignments",
                icon: "ClipboardList",
                role: ["MENTOR"],
            },
            {
                title: "Student Progress",
                href: "/mentor/dashboard/student-progress",
                icon: "TrendingUp",
                role: ["MENTOR"],
            },
        ],
    },
    {
        title: "Communication",
        items: [
            {
                title: "Notices",
                href: "/mentor/dashboard/notices",
                icon: "Bell",
                role: ["MENTOR"],
            },
        ],
    },
]

/* ===================== GUEST ===================== */
export const guestNavItem: INavSection[] = [
    {
        title: "Explore",
        items: [
            {
                title: "Courses",
                href: "/guest/courses",
                icon: "BookOpen",
                role: ["GUEST"],
            },
            {
                title: "Events",
                href: "/guest/events",
                icon: "Megaphone",
                role: ["GUEST"],
            },
            {
                title: "Apply for Membership",
                href: "/guest/apply",
                icon: "UserPlus",
                role: ["GUEST"],
            },
        ],
    },
]

/* ===================== ROLE SWITCH ===================== */
export const getNavItemByRole = (role: UserRole) => {
    const commonNavItem = getCommonNavItems(role)

    switch (role) {
        case "ADMIN":
            return [...commonNavItem, ...adminNavItem]
        case "MEMBER":
            return [...commonNavItem, ...memberNavItem]
        case "MENTOR":
            return [...commonNavItem, ...mentorNavItem]
        case "GUEST":
            return [...commonNavItem, ...guestNavItem]
        default:
            return commonNavItem
    }
}
