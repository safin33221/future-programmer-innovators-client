

import ApplicationFrom from "@/components/modules/membershipApplication/ApplicationFrom";
import { getUserInfo } from "@/services/auth/getUser";
import { UserInfo } from "@/types/user/user.interface";

export default async function MembershipApplication() {

    const userInfo = await getUserInfo()
    return (
        <div className="container py-20 px-4 md:px-6 max-w-4xl mx-auto">

            {/* Header */}
            <div className="text-center space-y-4 mb-16">
                <h1 className="text-4xl font-bold tracking-tight">
                    Membership Application
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Join the community of innovators. Fill out the form below to apply.
                </p>
            </div>

            {/* Form Card */}
            <ApplicationFrom userInfo={userInfo as UserInfo} />


        </div>
    );
}