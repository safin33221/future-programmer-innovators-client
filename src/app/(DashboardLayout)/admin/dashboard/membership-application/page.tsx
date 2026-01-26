import MemberApplicationHeader from "@/components/modules/Admin/MembershipApplicationManagement/MemberApplicationHeader";
import MemberApplicationTable from "@/components/modules/Admin/MembershipApplicationManagement/MembershipApplicationTable";
import { getMemberApplications } from "@/services/member/membershipApplication";

export default async function page() {

    const memberApplicationRes = await getMemberApplications()

    const memberApplication = memberApplicationRes.data || []

    return (
        <div>
            <MemberApplicationHeader

            />
            <MemberApplicationTable applications={memberApplication} />
        </div>
    );
}