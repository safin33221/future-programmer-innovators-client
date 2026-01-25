"use client";

import { useState } from "react";
import ManagementTable from "@/components/shared/ManagementTable";
import { DepartmentColumn, } from "./DepartmentTableColumn";
import DepartmentViewDialog from "./DepartmentViewDialog";
import { IDepartment } from "@/types/department/department.interface";
import toast from "react-hot-toast";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { softDeleteDepartment } from "@/services/Admin/department/department";

interface DepartmentTableProps {
    departments: IDepartment[];
}

export default function DepartmentTable({ departments }: DepartmentTableProps) {
    const [viewingDepartment, setViewingDepartment] = useState<IDepartment | null>(null);
    const [deleting, setDeleting] = useState<IDepartment | null>(null);

    const [isDeletingDialog, setIsDeletingDialog] = useState(false);
    const handleView = (department: IDepartment) => {
        setViewingDepartment(department);
    };
    const handleDelete = async (user: IDepartment) => {
        setDeleting(user)
    }

    const confirmDelete = async () => {
        if (!deleting) return;

        setIsDeletingDialog(true);
        const result = await softDeleteDepartment(deleting.id as string);


        setIsDeletingDialog(false);
        if (result.success) {
            toast.success(result.message || "User deleted successfully");
            setDeleting(null);
            // handleRefresh();
        } else {
            toast.error(result.message || "Failed to delete User");
        }
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
            {/* Delete Confirmation Dialog */}
            <DeleteConfirmationDialog
                open={!!deleting}
                onOpenChange={(open) => !open && setDeleting(null)}
                onConfirm={confirmDelete}
                title="Delete User"
                description={`Are you sure you want to delete ${deleting?.name} Department? This action cannot be undone.`}
                isDeleting={isDeletingDialog}
            />
        </div>
    );
}
