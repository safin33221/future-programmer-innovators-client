
import GuestFilter from "@/components/modules/Admin/GuestManagement/GuestFilter";
import GuestManagementHeader from "@/components/modules/Admin/GuestManagement/GuestMangementHeader";
import GuestTable from "@/components/modules/Admin/GuestManagement/GuestTable";
import { queryStringFormatter } from "@/lib/formatters";
import { getAllUser } from "@/services/user/user";
import { UserRole } from "@/types/user/user.interface";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParamsObj = await searchParams;
  const finalParams = {
    ...searchParamsObj,
    role: UserRole.GUEST,
  };
  const queryString = queryStringFormatter(finalParams);
  const res = await getAllUser(queryString);
  const allUser = res.data.data

  return (
    <div>
      <GuestManagementHeader />
      <GuestFilter />
      <GuestTable users={allUser} />
    </div>
  );
};


