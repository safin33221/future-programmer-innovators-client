"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { INavSection } from "@/types/dashboard/dashboard.interface";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/common/Logo";
import { UserInfo } from "@/types/user/user.interface";

interface DashboardMobileSidebarContentProps {
    userInfo: UserInfo;
    navItems?: INavSection[];
    setIsSidebarOpen: (open: boolean) => void

    //   dashboardHome?: string;
}

export default function DashboardMobileSideBar({
    userInfo,
    navItems,
    setIsSidebarOpen
    //   dashboardHome,
}: DashboardMobileSidebarContentProps) {
    const pathname = usePathname();

    return (
        <div className="flex flex-col scroll-auto">
            {/* Logo */}
            <div className="flex h-16 items-center border-b px-6">
                <Link href={`/`}>
                    <Logo />
                </Link>
            </div>

            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

            {/* Navigation */}
            <ScrollArea className="flex-1 px-3 py-4">
                <nav className="space-y-6">
                    {navItems?.map((section, sectionIdx) => (
                        <div key={sectionIdx}>
                            {section.title && (
                                <h4 className="mb-2 px-3 text-xs text-muted-foreground uppercase font-bold">
                                    {section.title}
                                </h4>
                            )}

                            <div className="space-y-1">
                                {section.items.map((item) => {
                                    const isActive = pathname === item.href;

                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setIsSidebarOpen(false)}
                                            className={cn(
                                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                                                isActive
                                                    ? "bg-primary text-primary-foreground"
                                                    : "hover:bg-accent text-black"
                                            )}
                                        >
                                            <span className="flex-1">{item.title}</span>

                                            {item.badge && (
                                                <Badge
                                                    variant={isActive ? "secondary" : "default"}
                                                >
                                                    {item.badge}
                                                </Badge>
                                            )}
                                        </Link>
                                    );
                                })}
                            </div>

                            {sectionIdx < navItems.length - 1 && (
                                <Separator className="my-4" />
                            )}
                        </div>
                    ))}
                </nav>
            </ScrollArea>

            {/* User Info */}
            <div className="border-t p-4">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">
                            {userInfo?.firstName?.charAt(0).toUpperCase()}
                        </span>
                    </div>

                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-medium truncate">
                            {userInfo.firstName} {userInfo?.lastName}
                        </p>
                        <p className="text-xs text-muted-foreground capitalize">
                            {userInfo?.role?.toLowerCase()}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
