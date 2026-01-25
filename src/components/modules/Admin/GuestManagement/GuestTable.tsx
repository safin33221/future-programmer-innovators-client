"use client"
import ManagementTable from "@/components/shared/ManagementTable";

import { GuestColumn } from "./GuestTableColumn";
import { useState } from "react";
import GuestViewDetailDialog from "./GuestViewDetailDialog";
import { softDelete } from "@/services/user/user";
import toast from "react-hot-toast";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { UserInfo } from "@/types/user/user.interface";

interface GuestTableProps {
    users: UserInfo[];
}




export default function GuestTable({ users }: GuestTableProps) {
    const [viewingGuest, setViewingGuest] = useState<UserInfo | null>(null);
    const [deleting, setDeleting] = useState<UserInfo | null>(null);

    const [isDeletingDialog, setIsDeletingDialog] = useState(false);
    const handleDelete = async (user: UserInfo) => {
        setDeleting(user)
    }
    const handleView = (user: UserInfo) => {
        setViewingGuest(user)
    }
    const handleEdit = (user: UserInfo) => {
        setViewingGuest(user)
    }

    const confirmDelete = async () => {
        if (!deleting) return;

        setIsDeletingDialog(true);
        const result = await softDelete(deleting.id as string);


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
                data={users}
                columns={GuestColumn}
                getRowKey={(users) => users.id}
                onDelete={handleDelete}
                onView={handleView}
                onEdit={handleEdit}


            />

            <GuestViewDetailDialog
                open={!!viewingGuest}
                onClose={() => setViewingGuest(null)}
                guest={viewingGuest}
            />

            {/* Delete Confirmation Dialog */}
            <DeleteConfirmationDialog
                open={!!deleting}
                onOpenChange={(open) => !open && setDeleting(null)}
                onConfirm={confirmDelete}
                title="Delete User"
                description={`Are you sure you want to delete ${deleting?.firstName} ${deleting?.lastName}? This action cannot be undone.`}
                isDeleting={isDeletingDialog}
            />
        </div>
    );
}
