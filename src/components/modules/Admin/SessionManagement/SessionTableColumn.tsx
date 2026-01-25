import { DateCell } from "@/components/shared/cell/DateCell";
import { columns } from "@/components/shared/ManagementTable";
import { ISession } from "@/types/Session/session.intrface";


export const SessionColumn: columns<ISession>[] = [
    {
        header: "Name",
        accessor: (s) => (
            <div>
                <p className="font-medium">{s.name}</p>
                <p className="text-xs text-muted-foreground">ID: {s.id}</p>
            </div>
        ),
    },
    {
        header: "Created At",
        accessor: (s) => <DateCell date={s.createdAt} />,
    },
];
