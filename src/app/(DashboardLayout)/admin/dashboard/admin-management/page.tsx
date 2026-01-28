import AdminsFilter from "@/components/modules/Admin/AdminManagement/AdminFilter";
import AdminManagementHeader from "@/components/modules/Admin/AdminManagement/AdminManagementHeader";
import AdminTable from "@/components/modules/Admin/AdminManagement/AdminTable";
import { queryStringFormatter } from "@/lib/formatters";
import { getAllUser } from "@/services/user/user";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const users = await getAllUser(queryString);




  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <AdminManagementHeader />


      {/* Filters */}

      <AdminsFilter />

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
        <AdminTable users={users?.data?.data} />
      </div>
    </div >
  );
}
