"use client";

import { useState } from "react";
import ManagementTable from "@/components/shared/ManagementTable";
import { UserInfo } from "@/types/user/user.interface";

import MentorViewDialog from "./MentorViewDialog";
import { MentorColumn } from "./MentorTableColumn";

interface MentorTableProps {
    users: UserInfo[];
}

export default function MentorTable({ users }: MentorTableProps) {
    const [viewingMentor, setViewingMentor] = useState<UserInfo | null>(null);

    const handleView = (user: UserInfo) => {
        setViewingMentor(user);
    };

    const handleDelete = (user: UserInfo) => {
        // TODO: delete mentor logic
        console.log("Delete mentor:", user.id);
    };

    return (
        <div className="overflow-x-auto rounded-lg border">
            <ManagementTable
                data={users}
                columns={MentorColumn}
                getRowKey={(user) => user.id}
                onView={handleView}
                onDelete={handleDelete}
            />

            <MentorViewDialog
                open={!!viewingMentor}
                onClose={() => setViewingMentor(null)}
                mentor={viewingMentor}
            />
        </div>
    );
}
