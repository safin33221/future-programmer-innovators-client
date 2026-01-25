"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import LearningTrackFormDialog from "./LearningTrackFormDialog";


const LearningTrackManagementHeader = () => {
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
            <LearningTrackFormDialog
                key={dialogKey}
                open={isDialogOpen}
                onClose={handleCloseDialog}
                onSuccess={handleSuccess}
            />

            <ManagementPageHeader
                title="Learning Track Management"
                description="Create and manage learning tracks, topics, roadmap, and careers"
                action={{
                    label: "Add Learning Track",
                    icon: Plus,
                    onClick: handleOpenDialog,
                }}
            />
        </>
    );
};

export default LearningTrackManagementHeader;
