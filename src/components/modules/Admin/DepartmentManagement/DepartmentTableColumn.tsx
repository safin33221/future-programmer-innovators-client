import { DateCell } from "@/components/shared/cell/DateCell";
import { columns } from "@/components/shared/ManagementTable";
import { IDepartment } from "@/types/department/department.interface";




export const DepartmentColumn: columns<IDepartment>[] = [
    {
        header: "Department",
        accessor: (department) => (
            <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">
                    {department.name}
                </span>
                <span className="text-xs text-muted-foreground">
                    ID: {department.id}
                </span>
            </div>
        ),
    },

    {
        header: "Members",
        accessor: (department) => (
            <span className="text-sm text-muted-foreground">
                {department._count?.members ?? 0}
            </span>
        ),
        className: "text-center",
    },

    {
        header: "Applications",
        accessor: (department) => (
            <span className="text-sm text-muted-foreground">
                {department._count?.memberApplications ?? 0}
            </span>
        ),
        className: "text-center",
    },

    {
        header: "Created At",
        accessor: (department) => (
            <span className="text-sm text-muted-foreground">
                <DateCell date={department.createdAt} />
            </span>
        ),
    },
];
