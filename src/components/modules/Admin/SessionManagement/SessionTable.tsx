"use client";

import ManagementTable from "@/components/shared/ManagementTable";
import { SessionColumn } from "./SessionTableColumn";
import { ISession } from "@/types/Session/session.intrface";


export default function SessionTable({ sessions }: { sessions: ISession[] }) {
    return (
        <div className="rounded-lg border">
            <ManagementTable
                data={sessions}
                columns={SessionColumn}
                getRowKey={(s) => s.id}
            />
        </div>
    );
}
