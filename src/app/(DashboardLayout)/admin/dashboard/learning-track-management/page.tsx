import LearningTrackManagementHeader from "@/components/modules/Admin/LearningTrackManagement/LearningTrackManagementHeader";
import LearningTrackTable from "@/components/modules/Admin/LearningTrackManagement/LearningTrackTable";

import { getAllLearningTracksForAdmin } from "@/services/Admin/learningTrack/learningTrack";
import { ILearningTrack } from "@/types/learningTrack/learningTrack.interface";

export default async function page() {
    const res = await getAllLearningTracksForAdmin();
    console.log(res);
    const tracks = res?.data.data as ILearningTrack[] || [];




    return (
        <div>
            <LearningTrackManagementHeader />
            <LearningTrackTable tracks={tracks} />
        </div>
    );
}
