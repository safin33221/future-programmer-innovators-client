import AdminsFilter from "@/components/modules/Admin/AdminManagement/AdminFilter";
import AdminManagementHeader from "@/components/modules/Admin/AdminManagement/AdminManagementHeader";
import AdminTable from "@/components/modules/Admin/AdminManagement/AdminTable";
import { queryStringFormatter } from "@/lib/formatters";
import { getAllUser } from "@/services/user/user";
import { UserRole } from "@/types/user/user.interface";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParamsObj = await searchParams;
  const finalParams = {
    ...searchParamsObj,
    role: UserRole.ADMIN,
  };
  const queryString = queryStringFormatter(finalParams);
  const res = await getAllUser(queryString);
  const allUser = res.data.data




  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <AdminManagementHeader />


      {/* Filters */}

      <AdminsFilter />

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
        <AdminTable users={allUser} />
      </div>
    </div >
  );
}
