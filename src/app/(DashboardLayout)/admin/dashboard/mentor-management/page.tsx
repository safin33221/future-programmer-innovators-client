

import MentorFilter from "@/components/modules/Admin/MentorManagement/MentorFilter";
import MentorManagementHeader from "@/components/modules/Admin/MentorManagement/MentorManagementHeader";
import MentorTable from "@/components/modules/Admin/MentorManagement/MentorTable";
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
        role: UserRole.MENTOR,
    };
    const queryString = queryStringFormatter(finalParams);
    const res = await getAllUser(queryString);
    const allUser = res.data.data


    return (
        <div>
            <MentorManagementHeader />
            <MentorFilter />
            <MentorTable users={allUser} />
        </div>
    );
}
