import { INavSection } from "@/types/dashboard/dashboard.interface";
import DashboardSidebarContent from "./DashboardSidebarContent";
import { getUserInfo } from "@/services/auth/getUser";
import { getNavItemByRole } from "@/lib/navItem.config";
import { UserInfo, UserRole } from "@/types/user/user.interface";

export default async function DashboardSidebar() {
    const userInfo = (await getUserInfo()) as UserInfo
    if (!userInfo) {

        return null
    }

    const navItems: INavSection[] = getNavItemByRole(userInfo.role as UserRole)
    return (
        <div>
            <DashboardSidebarContent navItems={navItems} userInfo={userInfo} />
        </div>
    );
};
