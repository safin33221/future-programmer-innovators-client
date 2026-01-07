
import GuestTable from "@/components/modules/Admin/GuestManagement/GuestTable";
import { getAllUser } from "@/services/user/user";
import { UserRole } from "@/types/user/user.interface";

export default async function page() {
  const res = await getAllUser({ role: UserRole.GUEST });
  const allUser = res.data.data

  return (
    <div>
      <GuestTable users={allUser} />
    </div>
  );
};


