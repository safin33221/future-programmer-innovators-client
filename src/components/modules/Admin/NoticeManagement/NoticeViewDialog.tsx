import InfoRow from "@/components/shared/InfoRow";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { formatDateTime } from "@/lib/formatters";
import { INotice } from "@/types/user/Notice.interface";

import {
    FileText,
    User,
    Calendar,
    ShieldCheck,
    ShieldX,
} from "lucide-react";

interface INoticeViewDialogProps {
    open: boolean;
    onClose: () => void;
    notice: INotice | null;
}

const NoticeViewDialog = ({
    open,
    onClose,
    notice,
}: INoticeViewDialogProps) => {
    if (!notice) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="min-w-4xl max-h-[90vh] flex flex-col p-0">
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle>Notice Details</DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto px-6 pb-6">
                    {/* Notice Header */}
                    <div className="flex flex-col gap-4 p-6 bg-muted/40 rounded-lg mb-6">
                        <h2 className="text-2xl font-semibold flex items-center gap-2">
                            <FileText className="h-6 w-6 text-blue-600" />
                            {notice.title}
                        </h2>

                        <div className="flex flex-wrap gap-2">
                            <Badge
                                variant={notice.published ? "default" : "secondary"}
                                className="flex items-center gap-1"
                            >
                                {notice.published ? (
                                    <ShieldCheck className="h-3 w-3" />
                                ) : (
                                    <ShieldX className="h-3 w-3" />
                                )}
                                {notice.published ? "Published" : "Draft"}
                            </Badge>

                            <Badge variant="outline">Notice</Badge>
                        </div>
                    </div>

                    {/* Information Sections */}
                    <div className="space-y-6">
                        {/* Notice Information */}
                        <div>
                            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                <FileText className="h-5 w-5 text-emerald-600" />
                                Notice Information
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                                <InfoRow label="Notice ID" value={notice.id} />
                                <InfoRow
                                    label="Publish Status"
                                    value={notice.published ? "Published" : "Draft"}
                                />
                            </div>
                        </div>

                        <Separator />

                        {/* Content Section */}
                        <div>
                            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                <FileText className="h-5 w-5 text-purple-600" />
                                Notice Content
                            </h3>

                            <div className="bg-muted/50 p-4 rounded-lg whitespace-pre-wrap text-sm text-foreground">
                                {notice.content || "No content provided"}
                            </div>
                        </div>

                        <Separator />

                        {/* Author Information */}
                        <div>
                            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                <User className="h-5 w-5 text-blue-600" />
                                Author Information
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                                <InfoRow
                                    label="Created By"
                                    value={notice.createdBy?.email || "Unknown"}
                                />
                            </div>
                        </div>

                        <Separator />

                        {/* System Information */}
                        <div>
                            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                <Calendar className="h-5 w-5 text-orange-600" />
                                System Information
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                                <InfoRow
                                    label="Created At"
                                    value={formatDateTime(notice.createdAt)}
                                />
                                <InfoRow
                                    label="Last Updated"
                                    value={formatDateTime(notice.updatedAt)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default NoticeViewDialog;
