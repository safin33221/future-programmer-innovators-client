"use client";

import { Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import ManagementPageHeader from "@/components/shared/ManagementPageHeader";



const MemberApplicationHeader = () => {
    const router = useRouter();
    const [, startTransition] = useTransition();

    const [open, setOpen] = useState(false);

    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    return (
        <>


            <ManagementPageHeader
                title="MemberShip Applications"
                description="Review and manage all learning track applications"

            />
        </>
    );
};

export default MemberApplicationHeader;
