"use client";


import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import NoticeFormDialog from "./NoticeFormDialog";

import ManagementPageHeader from "@/components/shared/ManagementPageHeader";

const NoticeManagementHeader = () => {
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
            <NoticeFormDialog
                key={dialogKey}
                open={isDialogOpen}
                onClose={handleCloseDialog}
                onSuccess={handleSuccess}
            />

            <ManagementPageHeader
                title="Notice Management"
                description="Create, publish, and manage system notices"
                action={{
                    label: "Add Notice",
                    icon: Plus,
                    onClick: handleOpenDialog,
                }}
            />
        </>
    );
};

export default NoticeManagementHeader;
