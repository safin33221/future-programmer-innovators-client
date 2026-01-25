"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import SessionFormDialog from "./SessionFromDialog";


const SessionManagementHeader = () => {
    const router = useRouter();
    const [, startTransition] = useTransition();

    const [open, setOpen] = useState(false);

    const onSuccess = () => {
        startTransition(() => router.refresh());
    };

    return (
        <>
            <SessionFormDialog
                open={open}
                onClose={() => setOpen(false)}
                onSuccess={onSuccess}
            />

            <ManagementPageHeader
                title="Session Management"
                description="Create and manage sessions"
                action={{
                    label: "Add Session",
                    icon: Plus,
                    onClick: () => setOpen(true),
                }}
            />
        </>
    );
};

export default SessionManagementHeader;
