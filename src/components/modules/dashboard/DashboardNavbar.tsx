
import DashboardNavbarContent from "./DashboardNavbarContent"
import { getNavItemByRole } from "@/lib/navItem.config"
import { INavSection } from "@/types/dashboard/dashboard.interface"
import { getMe } from "@/services/user/user"
import { UserRole } from "@/types/user/user.interface"

export default async function DashboardNavbar() {
    const userInfo = await getMe()
    if (!userInfo) {

        return null
    }


    const navItems: INavSection[] = getNavItemByRole(userInfo.data.role as UserRole)
    console.log(userInfo);

    return (
        <div>
            <DashboardNavbarContent userInfo={userInfo.data} navItems={navItems} />

        </div>
    )

};
