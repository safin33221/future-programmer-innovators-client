import { DateCell } from "@/components/shared/cell/DateCell";
import { columns } from "@/components/shared/ManagementTable";
import { UserInfo } from "@/types/user/user.interface";

export const MentorColumn: columns<UserInfo>[] = [
  {
    header: "Name",
    accessor: (mentor) => (
      <div className="flex flex-col">
        <span className="text-sm font-medium text-foreground">
          {mentor.firstName} {mentor.lastName}
        </span>
        <span className="text-xs text-muted-foreground">
          ID: {mentor.id}
        </span>
      </div>
    ),
  },

  {
    header: "Email",
    accessor: (mentor) => (
      <span className="text-sm text-muted-foreground">
        {mentor.email}
      </span>
    ),
  },

  {
    header: "Expertise",
    accessor: (mentor) => (
      <span className="text-sm font-medium text-foreground">
        {mentor?.mentor?.expertise ?? "—"}
      </span>
    ),
    className: "text-center",
  },

  {
    header: "Designation",
    accessor: (mentor) => (
      <span className="text-sm text-muted-foreground">
        {mentor?.mentor?.designation ?? "—"}
      </span>
    ),
    className: "text-center",
  },

  {
    header: "Status",
    accessor: (mentor) => (
      <span
        className={`inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium
          ${mentor.isActive
            ? "bg-emerald-100 text-emerald-700"
            : "bg-red-100 text-red-700"
          }`}
      >
        {mentor.isActive ? "Active" : "InActive"}
      </span>
    ),
    className: "text-center",
  },

  {
    header: "Verification",
    accessor: (mentor) => (
      <span
        className={`inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium
          ${mentor.isVerified
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700"
          }`}
      >
        {mentor.isVerified ? "Verified" : "Unverified"}
      </span>
    ),
    className: "text-center",
  },

  {
    header: "Joined At",
    accessor: (mentor) => (
      <span className="text-sm text-muted-foreground">
        <DateCell date={mentor.createdAt} />
      </span>
    ),
  },
];
