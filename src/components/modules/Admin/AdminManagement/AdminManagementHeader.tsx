"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import AdminFormDialog from "./AdminFormDialog";
// { allGuest = [] }: { allGuest: UserInfo[] | [] }
const AdminManagementHeader = () => {
    const router = useRouter();
    const [, startTransition] = useTransition();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogKey, setDialogKey] = useState(0);

    const handleSuccess = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    const handleOpenDialog = () => {
        setDialogKey((prev) => prev + 1); // force remount
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    return (
        <>
            {/* <AdminFormDialog
                key={dialogKey}
                open={isDialogOpen}
                onClose={handleCloseDialog}
                onSuccess={handleSuccess}
                initialUsers={allGuest}
            /> */}

            <ManagementPageHeader
                title="Admin Management"
                description="Create, update, and manage system administrators"
                action={{
                    label: "Add Admin",
                    icon: Plus,
                    onClick: handleOpenDialog,
                }}
            />
        </>
    );
};

export default AdminManagementHeader;