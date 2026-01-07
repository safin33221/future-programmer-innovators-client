import AdminTable from "@/components/modules/Admin/AdminManagement/AdminTable";
import { getAllUser } from "@/services/user/user";
import { UserRole } from "@/types/user/user.interface";

export default async function page() {
  const res = await getAllUser({ role: UserRole.ADMIN });
  const allUser = res.data.data
  return (
    <div>
      <AdminTable users={allUser} />
    </div>
  );
};
