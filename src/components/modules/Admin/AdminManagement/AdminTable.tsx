"use client";

import { useState } from "react";
import ManagementTable from "@/components/shared/ManagementTable";
import { IUser } from "@/types/user/user.interface";
import { AdminColumn } from "./AdminTableColumn";
import AdminViewDetailDialog from "./AdminViewDialog";

interface AdminTableProps {
    users: IUser[];
}

export default function AdminTable({ users }: AdminTableProps) {
    const [viewingAdmin, setViewingAdmin] = useState<IUser | null>(null);

    const handleView = (user: IUser) => {
        setViewingAdmin(user);
    };

    const handleDelete = (user: IUser) => {
        // TODO: delete admin logic
        console.log("Delete admin:", user.id);
    };

    return (
        <div className="overflow-x-auto rounded-lg border">
            <ManagementTable
                data={users}
                columns={AdminColumn}
                getRowKey={(user) => user.id}
                onView={handleView}
                onDelete={handleDelete}
            />

            <AdminViewDetailDialog
                open={!!viewingAdmin}
                onClose={() => setViewingAdmin(null)}
                admin={viewingAdmin}
            />
        </div>
    );
}
