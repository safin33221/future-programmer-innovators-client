"use client";

import { IUserInfo } from "@/types/user/user.interface";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Bell, Menu, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { UserDropdown } from "./UserDropdown";
import DashboardMobileSideBar from "./DashboardMobileSideBar";
import { INavSection } from "@/types/dashboard/dashboard.interface";
import { Logo } from "@/components/common/Logo";

interface DashboardNavbarContentProps {
    userInfo: IUserInfo;
    navItems: INavSection[];
    dashboardHome?: string;
}

export default function DashboardNavbarContent({
    userInfo,
    navItems,
    // dashboardHome,
}: DashboardNavbarContentProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    // const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkSmallScreen = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkSmallScreen();
        window.addEventListener("resize", checkSmallScreen);

        return () => {
            window.removeEventListener("resize", checkSmallScreen);
        };
    }, []);

    return (
        <header className="fixed top-0 left-0 z-50 w-full h-16 border-b bg-white flex items-center px-6">
            {/* Logo Area */}
            <div className="w-64 shrink-0 flex items-center max-md:hidden">
                <Logo />
            </div>

            {/* Rest of Navbar */}
            <div className="flex items-center justify-end w-full gap-6">
                {/* Mobile Menu */}
                {isMobile && (
                    <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                        <SheetTrigger asChild>
                            <button className="p-2 rounded-md hover:bg-gray-100">
                                <Menu />
                            </button>
                        </SheetTrigger>

                        <SheetContent side="left" className="p-0">
                            <DashboardMobileSideBar
                                userInfo={userInfo}
                                navItems={navItems}
                                setIsSidebarOpen={setIsSidebarOpen}
                            />
                        </SheetContent>
                    </Sheet>
                )}

                {/* Search */}
                <div className="flex items-center w-full max-w-md border rounded-md px-3 py-2 bg-gray-50">
                    <Search className="w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="ml-2 w-full bg-transparent outline-none text-sm"
                    />
                </div>

                {/* Notifications */}
                <div className="relative">
                    <button className="p-2 rounded-full hover:bg-gray-100">
                        <Bell className="w-5 h-5 text-gray-600" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                    </button>
                </div>

                {/* User Dropdown */}
                <UserDropdown userInfo={userInfo} />
            </div>
        </header>

    );
}
