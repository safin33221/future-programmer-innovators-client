import { DateCell } from "@/components/shared/cell/DateCell";
import { columns } from "@/components/shared/ManagementTable";
import { UserInfo } from "@/types/user/user.interface";


export const GuestColumn: columns<UserInfo>[] = [
  {
    header: "Name",
    accessor: (guest) => (
      <div className="flex flex-col">
        <span className="text-sm font-medium text-foreground">
          {guest.firstName} {guest.lastName}
        </span>
      </div>
    ),
  },
  {
    header: "Email",
    accessor: (guest) => (
      <span className="text-sm text-muted-foreground">
        {guest.email}
      </span>
    ),
  },
  {
    header: "Role",
    accessor: (guest) => (
      <span className="text-sm font-semibold uppercase tracking-wide">
        {guest.role}
      </span>
    ),
  },
  {
    header: "Verification",
    accessor: (guest) => (
      <span
        className={`inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium
          ${guest.isVerified
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700"
          }`}
      >
        {guest.isVerified ? "Verified" : "Unverified"}
      </span>
    ),
    className: "text-center", // ✅ table-style alignment
  },
  {
    header: "Status",
    accessor: (guest) => (
      <span
        className={`inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium
          ${guest.isActive
            ? "bg-emerald-100 text-emerald-700"
            : "bg-red-100 text-red-700"
          }`}
      >
        {guest.isActive ? "Active" : "Inactive"}
      </span>
    ),
    className: "text-center",
  },
  {
    header: "Created At",
    accessor: (guest) => (
      <span className="text-sm text-muted-foreground">
        <DateCell date={guest.createdAt} />
      </span>
    ),
  },
];
