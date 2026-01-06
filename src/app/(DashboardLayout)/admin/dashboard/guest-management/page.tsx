
import GuestTable from "@/components/modules/Admin/GuestManagement/GuestTable";
import { getAllUser } from "@/services/user/user";

export default async function page() {
  const res = await getAllUser()
  const allUser = res.data
  return (
    <div>
      <GuestTable users={allUser} />
    </div>
  );
};


