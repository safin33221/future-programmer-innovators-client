// app/(admin)/sessions/page.tsx

import SessionManagementHeader from "@/components/modules/Admin/SessionManagement/SessionManagementHeader";
import SessionTable from "@/components/modules/Admin/SessionManagement/SessionTable";
import { getAllSessions } from "@/services/Admin/session/session";


export default async function page() {
    const res = await getAllSessions();
    console.log(res);
    const sessions = res.data;

    return (
        <div>
            <SessionManagementHeader />
            <SessionTable sessions={sessions} />
        </div>
    );
}
