export const dynamic = 'force-dynamic';
import ApplicationFrom from "@/components/modules/membershipApplication/ApplicationFrom";
import { getAllDepartments } from "@/services/Admin/department/department";
import { getAllLearningTracksForAdmin } from "@/services/Admin/learningTrack/learningTrack";
import { getAllSessions } from "@/services/Admin/session/session";
import { getUserInfo } from "@/services/auth/getUser";
import { UserInfo } from "@/types/user/user.interface";
import { redirect } from "next/navigation";

export default async function MembershipApplication() {
    const userInfo = await getUserInfo();
    const departmentsRes = await getAllDepartments();
    const sessionsRes = await getAllSessions();
    const learningStack = await getAllLearningTracksForAdmin()
    if (!userInfo || userInfo.role !== "GUEST") {
        redirect("/");
    }

    const departments = departmentsRes.data;
    const sessions = sessionsRes.data;
    const learningStackData = learningStack.data.data || []


    return (
        <div className="container  px-4 md:px-6 max-w-4xl mx-auto border-2 p-8 my-16 rounded-lg shadow-lg">
            <div className="text-center space-y-4 mb-16 ">
                <h1 className="text-4xl font-bold tracking-tight">
                    Membership Application
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Join the community of innovators. Fill out the form below to apply.
                </p>
            </div>

            <ApplicationFrom
                userInfo={userInfo as UserInfo}
                departments={departments}
                sessions={sessions}
                learningStack={learningStackData}
            />
        </div>
    );
}
