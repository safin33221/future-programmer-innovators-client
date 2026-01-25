"use client";

import { useState } from "react";
import ManagementTable from "@/components/shared/ManagementTable";
import { ILearningTrack } from "@/types/learningTrack/learningTrack.interface";
import { LearningTrackColumn } from "./LearningTrackTableColumn";
import LearningTrackViewDialog from "./LearningTrackViewDialog";

interface Props {
    tracks: ILearningTrack[];
}

export default function LearningTrackTable({ tracks }: Props) {
    const [viewingTrack, setViewingTrack] = useState<ILearningTrack | null>(null);

    const handleView = (track: ILearningTrack) => {
        setViewingTrack(track);
    };

    const handleDelete = (track: ILearningTrack) => {
        console.log("Delete track:", track.id);
        // later → soft delete
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
        </div>
    );
}
