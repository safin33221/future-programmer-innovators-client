"use client";

import { useState } from "react";
import ManagementTable from "@/components/shared/ManagementTable";
import { IUser } from "@/types/user/user.interface";

import MemberViewDetailDialog from "./MemberViewDialog";
import { MemberColumn } from "./MemberTableColumn";


interface MemberTableProps {
    users: IUser[];
}

export default function MemberTable({ users }: MemberTableProps) {
    const [viewingMember, setViewingMember] = useState<IUser | null>(null);

    const handleView = (user: IUser) => {
        setViewingMember(user);
    };

    const handleDelete = (user: IUser) => {
        // TODO: delete member logic
        console.log("Delete member:", user.id);
    };

    return (
        <div className="overflow-x-auto rounded-lg border">
            <ManagementTable
                data={users}
                columns={MemberColumn}
                getRowKey={(user) => user.id}
                onView={handleView}
                onDelete={handleDelete}
            />

            <MemberViewDetailDialog
                open={!!viewingMember}
                onClose={() => setViewingMember(null)}
                member={viewingMember}
            />
        </div>
    );
}
