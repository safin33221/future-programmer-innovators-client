"use client";

import { useState } from "react";
import ManagementTable from "@/components/shared/ManagementTable";

import { AdminColumn } from "./AdminTableColumn";
import AdminViewDetailDialog from "./AdminViewDialog";
import { UserInfo } from "@/types/user/user.interface";

interface AdminTableProps {
    users: UserInfo[];
}

export default function AdminTable({ users }: AdminTableProps) {
    const [viewingAdmin, setViewingAdmin] = useState<UserInfo | null>(null);


    const handleView = (user: UserInfo) => {
        setViewingAdmin(user);
    };

    const handleDelete = (user: UserInfo) => {
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
