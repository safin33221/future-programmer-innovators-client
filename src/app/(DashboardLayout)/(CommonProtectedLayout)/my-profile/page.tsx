
import MyProfile from "@/components/modules/myProfile/MyProfile";
import { getUserInfo } from "@/services/auth/getUser";
import { UserInfo } from "@/types/user/user.interface";

import { notFound } from "next/navigation";

const MyProfilePage = async () => {
    const userInfo = await getUserInfo();

    if (!userInfo) {
        notFound();
    }

    return <MyProfile userInfo={userInfo as UserInfo} />;

};

export default MyProfilePage;
