import { DateCell } from "@/components/shared/cell/DateCell";
import { columns } from "@/components/shared/ManagementTable";
import { IMemberApplication } from "@/types/member/member.interface";


export const MemberApplicationColumn: columns<IMemberApplication>[] = [
    {
        header: "Applicant",
        accessor: (app) => (
            <div className="flex flex-col">
                <span className="text-sm font-medium">
                    {app.user.firstName} {app.user.lastName}
                </span>
                <span className="text-xs text-muted-foreground">
                    {app.user.email}
                </span>
            </div>
        ),
    },

    {
        header: "Student ID",
        accessor: (app) => (
            <span className="text-sm text-muted-foreground">
                {app.studentId}
            </span>
        ),
    },

    {
        header: "Department",
        accessor: (app) => (
            <span className="text-sm">
                {app.department?.name ?? "—"}
            </span>
        ),
    },

    {
        header: "Session",
        accessor: (app) => (
            <span className="text-sm">
                {app.session?.name ?? "—"}
            </span>
        ),
    },

    {
        header: "Status",
        accessor: (app) => (
            <span
                className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium
                ${app.status === "PENDING" && "bg-yellow-100 text-yellow-700"}
                ${app.status === "APPROVED" && "bg-emerald-100 text-emerald-700"}
                ${app.status === "REJECTED" && "bg-red-100 text-red-700"}
                `}
            >
                {app.status}
            </span>
        ),
        className: "text-center",
    },

    {
        header: "Applied At",
        accessor: (app) => (
            <span className="text-sm text-muted-foreground">
                <DateCell date={app.createdAt} />
            </span>
        ),
    },
];
