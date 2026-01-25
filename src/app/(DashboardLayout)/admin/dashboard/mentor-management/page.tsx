

import MentorTable from "@/components/modules/Admin/MentorManagement/MentorTable";
import { getAllUser } from "@/services/user/user";
import { UserRole } from "@/types/user/user.interface";

export default async function page() {
    const res = await getAllUser({ role: UserRole.MENTOR });
    const allUsers = res.data.data


    return (
        <div>
            <MentorTable users={allUsers} />
        </div>
    );
}
