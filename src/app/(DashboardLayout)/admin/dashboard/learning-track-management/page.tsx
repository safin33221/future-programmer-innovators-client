import LearningTrackManagementHeader from "@/components/modules/Admin/LearningTrackManagement/LearningTrackManagementHeader";
import LearningTrackTable from "@/components/modules/Admin/LearningTrackManagement/LearningTrackTable";

import { getAllLearningTracksForAdmin } from "@/services/Admin/learningTrack/learningTrack";

export default async function page() {
    const res = await getAllLearningTracksForAdmin();
    const tracks = res.data.data;



    return (
        <div>
            <LearningTrackManagementHeader />
            <LearningTrackTable tracks={tracks} />
        </div>
    );
}
