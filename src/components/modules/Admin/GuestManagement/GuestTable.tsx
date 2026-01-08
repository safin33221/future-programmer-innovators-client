"use client"
import ManagementTable from "@/components/shared/ManagementTable";
import { IUser } from "@/types/user/user.interface";
import { GuestColumn } from "./GuestTableColumn";
import { useState } from "react";
import GuestViewDetailDialog from "./GuestViewDetailDialog";
import { softDelete } from "@/services/user/user";
import toast from "react-hot-toast";

interface GuestTableProps {
    users: IUser[];
}




export default function GuestTable({ users }: GuestTableProps) {
    const [viewingGuest, setViewingGuest] = useState<IUser | null>(null);
    const handleDelete = async (user: IUser) => {
        try {
            const res = await softDelete(user.id)
            toast.success(res.data.message || "user Deleted Successful")
        } catch (error) {
            console.log(error);
        }
    }
    const handleView = (user: IUser) => {
        setViewingGuest(user)
    }

    return (
        <div className="overflow-x-auto rounded-lg border">

            <ManagementTable
                data={users}
                columns={GuestColumn}
                getRowKey={(users) => users.id}
                onDelete={handleDelete}
                onView={handleView}

            />

            <GuestViewDetailDialog
                open={!!viewingGuest}
                onClose={() => setViewingGuest(null)}
                guest={viewingGuest}
            />
        </div>
    );
}
