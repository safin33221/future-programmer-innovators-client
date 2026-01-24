"use client";

import { useState } from "react";
import ManagementTable from "@/components/shared/ManagementTable";
import { DepartmentColumn, } from "./DepartmentTableColumn";
import DepartmentViewDialog from "./DepartmentViewDialog";
import { IDepartment } from "@/types/department/department.interface";

interface DepartmentTableProps {
    departments: IDepartment[];
}

export default function DepartmentTable({ departments }: DepartmentTableProps) {
    const [viewingDepartment, setViewingDepartment] = useState<IDepartment | null>(null);

    const handleView = (department: IDepartment) => {
        setViewingDepartment(department);
    };

    const handleDelete = (department: IDepartment) => {
        // TODO: delete department logic
        console.log("Delete department:", department.id);
    };

    return (
        <div className="overflow-x-auto rounded-lg border">
            <ManagementTable
                data={departments}
                columns={DepartmentColumn}
                getRowKey={(department) => department.id}
                onView={handleView}
                onDelete={handleDelete}
            />

            <DepartmentViewDialog
                open={!!viewingDepartment}
                onClose={() => setViewingDepartment(null)}
                department={viewingDepartment}
            />
        </div>
    );
}
