"use client";

import { useState } from "react";
import ManagementTable from "@/components/shared/ManagementTable";


import { MemberApplicationColumn } from "./MembershipApplicationTableColumn";
import MemberApplicationViewDialog from "./MemberApplicationViewDialog";
import { IMemberApplication } from "@/types/member/member.interface";




/* ===============================
   TYPES
================================ */


interface MemberApplicationTableProps {
    applications: IMemberApplication[];

}

/* ===============================
   COMPONENT
================================ */
export default function MemberApplicationTable({
    applications,
}: MemberApplicationTableProps) {
    const [viewingApplication, setViewingApplication] =
        useState<IMemberApplication | null>(null);

    const handleView = (application: IMemberApplication) => {
        setViewingApplication(application);
    };

    const handleDelete = (application: IMemberApplication) => {
        // optional: reject / delete logic
        console.log("Delete application:", application.id);
    };

    return (
        <div className="overflow-x-auto rounded-lg border">
            <ManagementTable
                data={applications}
                columns={MemberApplicationColumn}
                getRowKey={(app) => app.id}
                onView={handleView}
                onDelete={handleDelete}
            />

            <MemberApplicationViewDialog
                open={!!viewingApplication}
                onClose={() => setViewingApplication(null)}
                application={viewingApplication!}
            />
        </div>
    );
}
