"use client";

import { useState } from "react";
import ManagementTable from "@/components/shared/ManagementTable";


import MemberViewDetailDialog from "./MemberViewDialog";
import { MemberColumn } from "./MemberTableColumn";
import { UserInfo } from "@/types/user/user.interface";



interface MemberTableProps {
    users: UserInfo[];

}

export default function MemberTable({ users }: MemberTableProps) {
    const [viewingMember, setViewingMember] = useState<UserInfo | null>(null);

    const handleView = (user: UserInfo) => {
        setViewingMember(user);
    };

    const handleDelete = (user: UserInfo) => {
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
