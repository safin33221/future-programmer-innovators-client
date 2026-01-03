"use client"
import { Logo } from "@/components/common/Logo";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { INavSection } from "@/types/dashboard/dashboard.interface";
import { IUserInfo } from "@/types/user/user.interface";
import Link from "next/link";
import { usePathname } from "next/navigation";
interface DashboardContentProps {
    navItems: INavSection[],
    userInfo: IUserInfo
}
export default function DashboardSidebarContent({ navItems, userInfo }: DashboardContentProps) {
    const pathname = usePathname();
    return (
        <div className="max-md:hidden">
            {/* Logo/Brand */}
            <div className="flex h-16 items-center border-b px-6">
                <Link href={"dashboardHome"} className="flex items-center space-x-2">
                    <Logo />
                </Link>
            </div>

            <ScrollArea className="flex-1 px-3 py-4">
                <nav className="space-y-6">
                    {
                        navItems?.map((section, sectionId) => (
                            <div key={sectionId}>
                                {
                                    section.title && (
                                        <div>
                                            <h4 className="mb-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                                {section.title}
                                            </h4>
                                        </div>
                                    )
                                }

                                <div className="space-y-1">
                                    {section.items.map((item) => {
                                        const isActive = pathname === item.href;
                                        return (
                                            <Link
                                                href={item.href}
                                                key={item.href}
                                                className={cn(
                                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium  transition-all",
                                                    isActive
                                                        ? "bg-primary text-primary-foreground"
                                                        : "text-black hover:bg-accent hover:text-accent-foreground "
                                                )}
                                            >
                                                <span className="flex-1">{item.title}</span>
                                                {item.badge && (
                                                    <Badge
                                                        variant={isActive ? "secondary" : "default"}
                                                        className="ml-auto"
                                                    >
                                                        {item.badge}
                                                    </Badge>
                                                )}
                                            </Link>
                                        )
                                    })
                                    }

                                </div>
                                {sectionId < navItems.length - 1 && (
                                    <Separator className="my-4" />
                                )}

                            </div>
                        ))
                    }

                </nav>
            </ScrollArea>
            {/* User Info at Bottom - Fixed at bottom */}
            <div className="shrink-0 border-t bottom-5 p-4 fixed">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-semibold text-primary">
                            {userInfo?.email?.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-medium truncate">{userInfo.name}</p>
                        <p className="text-xs text-black capitalize">
                            {userInfo?.role?.toLowerCase()}
                        </p>
                    </div>
                </div>
            </div>


        </div>
    );
};
