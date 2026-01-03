"use server"
import { getCookies } from "@/services/auth/tokenHandler";
import Navbar from "./Navbar";
import { getUserInfo } from "@/services/auth/getUser";
import { IUserInfo, IUserRole } from "@/types/user/user.interface";
import { getDefaultDashboardRoute } from "@/lib/auth-utils";


export default async function NavbarWrapper() {
    const accessToken = await getCookies("accessToken");
    const userInfo = await getUserInfo() as IUserInfo
    const defaultDashboardRoute = getDefaultDashboardRoute(userInfo?.role as IUserRole)

    return <Navbar isAuthenticated={!!accessToken} defaultDashboardRoute={defaultDashboardRoute} />;
}
