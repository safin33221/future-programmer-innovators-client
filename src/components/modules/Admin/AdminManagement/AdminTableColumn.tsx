import { DateCell } from "@/components/shared/cell/DateCell";
import { columns } from "@/components/shared/ManagementTable";
import { UserInfo } from "@/types/user/user.interface";

import { ShieldCheck } from "lucide-react";

export const AdminColumn: columns<UserInfo>[] = [
  {
    header: "Admin",
    accessor: (admin) => (
      <div className="flex flex-col">
        <span className="text-sm font-medium text-foreground">
          {admin.firstName} {admin.lastName}
        </span>
        <span className="text-xs text-muted-foreground">
          ID: {admin.id.slice(0, 8)}...
        </span>
      </div>
    ),
  },
  {
    header: "Email",
    accessor: (admin) => (
      <span className="text-sm text-muted-foreground">
        {admin.email}
      </span>
    ),
  },
  {
    header: "Role",
    accessor: (admin) => (
      <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700 uppercase">
        <ShieldCheck size={12} />
        {admin.role}
      </span>
    ),
    className: "text-center",
  },
  {
    header: "Verification",
    accessor: (admin) => (
      <span
        className={`inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium
          ${admin.isVerified
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700"
          }`}
      >
        {admin.isVerified ? "Verified" : "Unverified"}
      </span>
    ),
    className: "text-center",
  },
  {
    header: "Status",
    accessor: (admin) => (
      <span
        className={`inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium
          ${admin.isActive
            ? "bg-emerald-100 text-emerald-700"
            : "bg-red-100 text-red-700"
          }`}
      >
        {admin.isActive ? "Active" : "Inactive"}
      </span>
    ),
    className: "text-center",
  },
  {
    header: "Created At",
    accessor: (admin) => (
      <span className="text-sm text-muted-foreground">
        <DateCell date={admin.createdAt} />
      </span>
    ),
  },

];
