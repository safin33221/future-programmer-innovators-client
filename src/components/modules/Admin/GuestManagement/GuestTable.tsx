"use client"
import ManagementTable from "@/components/shared/ManagementTable";
import { IUser } from "@/types/user/user.interface";
import { GuestColumn } from "./GuestTableColumn";
import { useState } from "react";
import GuestViewDetailDialog from "./GuestViewDetailDialog";

interface GuestTableProps {
    users: IUser[];
}




export default function GuestTable({ users }: GuestTableProps) {
    const [viewingGuest, setViewingGuest] = useState<IUser | null>(null);
    const handleDelete = () => {

    }
    const handleView = (user: IUser) => {
        setViewingGuest(user)
    }
    const handleEdit = () => {

    }

    return (
        <div className="overflow-x-auto rounded-lg border">
            {/* <table className="min-w-full border-collapse">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border px-4 py-2 text-left">Name</th>
                        <th className="border px-4 py-2 text-left">Email</th>
                        <th className="border px-4 py-2 text-left">Role</th>
                        <th className="border px-4 py-2 text-left">Verified</th>
                        <th className="border px-4 py-2 text-left">Active</th>
                        <th className="border px-4 py-2 text-left">Created At</th>
                    </tr>
                </thead>

                <tbody>
                    {users?.length === 0 ? (
                        <tr>
                            <td
                                colSpan={6}
                                className="border px-4 py-6 text-center text-gray-500"
                            >
                                No guest users found
                            </td>
                        </tr>
                    ) : (
                        users?.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="border px-4 py-2">
                                    {user?.firstName} {user?.lastName}
                                </td>
                                <td className="border px-4 py-2">{user?.email}</td>
                                <td className="border px-4 py-2">{user?.role}</td>
                                <td className="border px-4 py-2">
                                    {user?.isVerified ? "Yes" : "No"}
                                </td>
                                <td className="border px-4 py-2">
                                    {user?.isActive ? "Active" : "Inactive"}
                                </td>
                                <td className="border px-4 py-2">
                                    {new Date(user?.createdAt).toLocaleDateString()}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table> */}






            <ManagementTable
                data={users}
                columns={GuestColumn}
                getRowKey={(users) => users.id}
                onDelete={handleDelete}
                onEdit={handleEdit}
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
