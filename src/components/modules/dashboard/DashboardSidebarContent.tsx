"use client"
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { INavSection } from "@/types/dashboard/dashboard.interface";
import { UserInfo } from "@/types/user/user.interface";
import Link from "next/link";
import { usePathname } from "next/navigation";
interface DashboardContentProps {
    navItems: INavSection[],
    userInfo: UserInfo
}
export default function DashboardSidebarContent({ navItems, userInfo }: DashboardContentProps) {
    const pathname = usePathname();
    return (
        <div className="max-md:hidden h-screen flex flex-col mt-16">


            {/* ONLY SIDEBAR SCROLL */}
            <ScrollArea className="flex-1 px-3 py-4">
                <nav className="space-y-6">
                    {navItems?.map((section, sectionId) => (
                        <div key={sectionId}>
                            {section.title && (
                                <h4 className="mb-2 px-3 text-xs font-semibold text-muted-foreground uppercase">
                                    {section.title}
                                </h4>
                            )}

                            <div className="space-y-1">
                                {section.items.map((item) => {
                                    const isActive = pathname === item.href
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={cn(
                                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium",
                                                isActive
                                                    ? "bg-primary text-primary-foreground"
                                                    : "hover:bg-accent"
                                            )}
                                        >
                                            <span className="flex-1">{item.title}</span>
                                            {item.badge && <Badge>{item.badge}</Badge>}
                                        </Link>
                                    )
                                })}
                            </div>

                            {sectionId < navItems.length - 1 && (
                                <Separator className="my-4" />
                            )}
                        </div>
                    ))}
                </nav>
            </ScrollArea>

            {/* User Info */}
            <div className="shrink-0 border-t p-4 sticky bottom-0 bg-background">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        {userInfo.email?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <p className="text-sm font-medium">{userInfo.firstName}</p>
                        <p className="text-xs capitalize">{userInfo.role}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
