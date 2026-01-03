import { INavSection } from "@/types/dashboard/dashboard.interface";
import DashboardSidebarContent from "./DashboardSidebarContent";
import { getNavItemByRole } from "@/lib/navItem.config";

export default function DashboardSidebar() {
    const navItems: INavSection[] = getNavItemByRole("ADMIN")
    return (
        <div>
            <DashboardSidebarContent navItems={navItems} />
        </div>
    );
};
