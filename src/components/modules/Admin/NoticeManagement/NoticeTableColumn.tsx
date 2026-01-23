import { DateCell } from "@/components/shared/cell/DateCell";
import { columns } from "@/components/shared/ManagementTable";
import { INotice } from "@/types/user/Notice.interface";


export const NoticeColumn: columns<INotice>[] = [
    {
        header: "Title",
        accessor: (notice) => (
            <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">
                    {notice.title}
                </span>
                <span className="text-xs text-muted-foreground">
                    ID: {notice.id}
                </span>
            </div>
        ),
    },

    {
        header: "Created By",
        accessor: (notice) => (
            <span className="text-sm text-muted-foreground">
                {notice.createdBy?.email ?? "—"}
            </span>
        ),
    },

    {
        header: "Content",
        accessor: (notice) => (
            <span className="text-sm text-muted-foreground line-clamp-1 max-w-[220px]">
                {notice.content ?? "—"}
            </span>
        ),
    },

    {
        header: "Publish Status",
        accessor: (notice) => (
            <span
                className={`inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium
          ${notice.published
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
            >
                {notice.published ? "Published" : "Draft"}
            </span>
        ),
        className: "text-center",
    },

    {
        header: "Created At",
        accessor: (notice) => (
            <span className="text-sm text-muted-foreground">
                <DateCell date={notice.createdAt} />
            </span>
        ),
    },
];
