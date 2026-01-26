/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useTransition } from "react";
import ManagementTable from "@/components/shared/ManagementTable";
import { ILearningTrack } from "@/types/learningTrack/learningTrack.interface";
import { LearningTrackColumn } from "./LearningTrackTableColumn";
import LearningTrackViewDialog from "./LearningTrackViewDialog";
import toast from "react-hot-toast";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { softDeleteLearningTrack } from "@/services/Admin/learningTrack/learningTrack";
import { useRouter } from "next/navigation";


interface Props {
    tracks: ILearningTrack[];
}

export default function LearningTrackTable({ tracks }: Props) {

    const router = useRouter();
    const [, startTransition] = useTransition();
    const [viewingTrack, setViewingTrack] = useState<ILearningTrack | null>(null);
    const [deletingTrack, setDeletingTrack] = useState<ILearningTrack | null>(null);
    const [isDeletingDialog, setIsDeletingDialog] = useState(false);

    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
        });
    };
    const handleView = (track: ILearningTrack) => {
        setViewingTrack(track);
    };

    const handleDelete = (track: ILearningTrack) => {
        setDeletingTrack(track);
    };

    const confirmDelete = async () => {
        if (!deletingTrack) return;

        setIsDeletingDialog(true);
        try {
            const result = await softDeleteLearningTrack(deletingTrack.id);

            if (result.success) {
                toast.success(result.message || "Learning track deleted successfully");
                setDeletingTrack(null);
                // Optionally refresh the data
                handleRefresh();
            } else {
                toast.error(result.message || "Failed to delete learning track");
            }
        } catch (error: any) {
            console.error("Delete error:", error);
            toast.error(error.message || "Failed to delete learning track");
        } finally {
            setIsDeletingDialog(false);
        }
    };

    return (
        <div className="overflow-x-auto rounded-lg border">
            <ManagementTable
                data={tracks}
                columns={LearningTrackColumn}
                getRowKey={(track) => track.id}
                onView={handleView}
                onDelete={handleDelete}
            />

            <LearningTrackViewDialog
                open={!!viewingTrack}
                onClose={() => setViewingTrack(null)}
                track={viewingTrack}
            />
            <DeleteConfirmationDialog
                open={!!deletingTrack}
                onOpenChange={(open) => !open && setDeletingTrack(null)}
                onConfirm={confirmDelete}
                title="Delete Learning Track"
                description={`Are you sure you want to delete "${deletingTrack?.name}"? This action cannot be undone.`}
                isDeleting={isDeletingDialog}
            />
        </div>
    );
}
