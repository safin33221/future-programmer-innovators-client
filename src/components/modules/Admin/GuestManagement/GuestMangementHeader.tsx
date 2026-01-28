"use client";


import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import CreateRoleBasedFormDialog from "./CreateRoleBasedFormDialog";
import { Plus } from "lucide-react";
// 
const GuestManagementHeader = () => {

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
            <CreateRoleBasedFormDialog
                key={dialogKey}
                open={isDialogOpen}
                onClose={handleCloseDialog}
                onSuccess={handleSuccess}
            />

            <ManagementPageHeader
                title="Guest Management"
                description="Create, update, and manage system Guests"
                action={{
                    label: "Create ",
                    icon: Plus,
                    onClick: handleOpenDialog,
                }}

            />
        </>
    );
};

export default GuestManagementHeader;