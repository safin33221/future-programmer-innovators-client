import { DateCell } from "@/components/shared/cell/DateCell";
import { columns } from "@/components/shared/ManagementTable";
import { UserInfo } from "@/types/user/user.interface";


export const MemberColumn: columns<UserInfo>[] = [
  {
    header: "Name",
    accessor: (member) => (
      <div className="flex flex-col">
        <span className="text-sm font-medium text-foreground">
          {member.firstName} {member.lastName}
        </span>
        <span className="text-xs text-muted-foreground">
          ID: {member.id}
        </span>
      </div>
    ),
  },

  {
    header: "Email",
    accessor: (member) => (
      <span className="text-sm text-muted-foreground">
        {member.email}
      </span>
    ),
  },

  {
    header: "Role",
    accessor: (member) => (
      <span className="text-sm font-semibold uppercase tracking-wide">
        {member.role}
      </span>
    ),
    className: "text-center",
  },

  {
    header: "Status",
    accessor: (member) => (
      <span
        className={`inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium
          ${member.isActive
            ? "bg-emerald-100 text-emerald-700"
            : "bg-red-100 text-red-700"
          }`}
      >
        {member.isActive ? "Active" : "InActive"}
      </span>
    ),
    className: "text-center",
  },

  {
    header: "Verification",
    accessor: (member) => (
      <span
        className={`inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium
          ${member.isVerified
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700"
          }`}
      >
        {member.isVerified ? "Verified" : "Unverified"}
      </span>
    ),
    className: "text-center",
  },

  {
    header: "Joined At",
    accessor: (member) => (
      <span className="text-sm text-muted-foreground">
        <DateCell date={member.createdAt} />
      </span>
    ),
  },
];
