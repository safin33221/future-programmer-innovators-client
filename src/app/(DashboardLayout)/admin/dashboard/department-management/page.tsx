import DepartmentManagementHeader from "@/components/modules/Admin/DepartmentManagement/DepartmentManagementHeader";
import DepartmentTable from "@/components/modules/Admin/DepartmentManagement/DepartmentTable";
import { getAllDepartments } from "@/services/Admin/department/department";


export default async function page() {
    const res = await getAllDepartments();
    const departments = res.data


    return (
        <div>
            <DepartmentManagementHeader />
            <DepartmentTable departments={departments} />
        </div>
    );
}

