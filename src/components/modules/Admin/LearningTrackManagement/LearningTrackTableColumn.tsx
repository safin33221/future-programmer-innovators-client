import { DateCell } from "@/components/shared/cell/DateCell";
import { columns } from "@/components/shared/ManagementTable";
import { ILearningTrack } from "@/types/learningTrack/learningTrack.interface";

export const LearningTrackColumn: columns<ILearningTrack>[] = [
    {
        header: "Track",
        accessor: (track) => (
            <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">
                    {track.name}
                </span>
                <span className="text-xs text-muted-foreground">
                    Slug: {track.slug}
                </span>
            </div>
        ),
    },

    {
        header: "Difficulty",
        accessor: (track) => (
            <span
                className={`inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium
                ${track.difficulty === "BEGINNER"
                        ? "bg-blue-100 text-blue-700"
                        : track.difficulty === "INTERMEDIATE"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                    }`}
            >
                {track.difficulty}
            </span>
        ),
        className: "text-center",
    },

    {
        header: "Duration",
        accessor: (track) => (
            <span className="text-sm text-muted-foreground">
                {track.duration}
            </span>
        ),
    },

    // {
    //     header: "Status",
    //     accessor: (track) => (
    //         <span
    //             className={`inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium
    //             ${track.isActive
    //                     ? "bg-emerald-100 text-emerald-700"
    //                     : "bg-gray-200 text-gray-700"
    //                 }`}
    //         >
    //             {track.isActive ? "Active" : "Inactive"}
    //         </span>
    //     ),
    //     className: "text-center",
    // },
    {
        header: "is Deleted",
        accessor: (track) => (
            <span
                className={`inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium
                ${track.isActive
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
            >
                {track.isDeleted ? "Deleted" : "Active"}
            </span>
        ),
        className: "text-center",
    },

    {
        header: "Created At",
        accessor: (track) => (
            <span className="text-sm text-muted-foreground">
                <DateCell date={track.createdAt} />
            </span>
        ),
    },
];
