
import NoticeManagementHeader from "@/components/modules/Admin/NoticeManagement/NoticeManagementHeader";
import NoticeTable from "@/components/modules/Admin/NoticeManagement/NoticeTable";
import { getAllNoticesForAdmin } from "@/services/notice/notice.service";


export default async function page() {
    const res = await getAllNoticesForAdmin();
    const notices = res.data.data
    console.log(notices);

    return (
        <div>
            <NoticeManagementHeader />
            <NoticeTable notices={notices} />
        </div>
    );
}
