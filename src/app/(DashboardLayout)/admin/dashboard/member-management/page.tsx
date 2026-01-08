import MemberTable from "@/components/modules/Admin/MemberManagement/MemberTable";
import { getAllUser } from "@/services/user/user";
import { UserRole } from "@/types/user/user.interface";

export default async function page() {
  const res = await getAllUser({ role: UserRole.MEMBER });
  const allUsers = res.data.data;

  return (
    <div>
      <MemberTable users={allUsers} />
    </div>
  );
}