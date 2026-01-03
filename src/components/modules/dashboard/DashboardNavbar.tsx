import { getUserInfo } from "@/services/auth/getUser"
import { IUserInfo, IUserRole } from "@/types/user/user.interface"
import DashboardNavbarContent from "./DashboardNavbarContent"
import { getNavItemByRole } from "@/lib/navItem.config"
import { INavSection } from "@/types/dashboard/dashboard.interface"

export default async function DashboardNavbar() {
    const userInfo = (await getUserInfo()) as IUserInfo
    if (!userInfo) {

        return null
    }
    const navItems: INavSection[] = getNavItemByRole(userInfo.role as IUserRole)
    return <DashboardNavbarContent userInfo={userInfo} navItems={navItems} />

};
