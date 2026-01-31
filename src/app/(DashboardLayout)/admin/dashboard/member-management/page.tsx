import MemberFilter from "@/components/modules/Admin/MemberManagement/MemberFilter";
import MemberManagementHeader from "@/components/modules/Admin/MemberManagement/MemberManagementHeader";
import MemberTable from "@/components/modules/Admin/MemberManagement/MemberTable";
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
    role: UserRole.MEMBER,
  };
  const queryString = queryStringFormatter(finalParams);
  const res = await getAllUser(queryString);
  const allUser = res.data.data
  console.log({ allUser });


  return (
    <div>
      <MemberManagementHeader />
      <MemberFilter />
      <MemberTable users={allUser} />
    </div>
  );
}