"use client";

import { useState } from "react";
import ManagementTable from "@/components/shared/ManagementTable";




import { INotice } from "@/types/user/Notice.interface";
import { NoticeColumn } from "./NoticeTableColumn";
import NoticeViewDialog from "./NoticeViewDialog";

interface NoticeTableProps {
    notices: INotice[];
}

export default function NoticeTable({ notices }: NoticeTableProps) {
    const [viewingNotice, setViewingNotice] = useState<INotice | null>(null);

    const handleView = (notice: INotice) => {
        setViewingNotice(notice);
    };

    const handleDelete = (notice: INotice) => {
        // TODO: delete notice logic
        console.log("Delete notice:", notice.id);
    };

    return (
        <div className="overflow-x-auto rounded-lg border">
            <ManagementTable
                data={notices}
                columns={NoticeColumn}
                getRowKey={(notice) => notice.id}
                onView={handleView}
                onDelete={handleDelete}
            />

            <NoticeViewDialog
                open={!!viewingNotice}
                onClose={() => setViewingNotice(null)}
                notice={viewingNotice}
            />
        </div>
    );
}
