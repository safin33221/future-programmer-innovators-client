"use client";

import InfoRow from "@/components/shared/InfoRow";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { formatDateTime, getInitials } from "@/lib/formatters";
import { IMemberApplication } from "@/types/member/member.interface";

import {
    Calendar,
    Mail,
    User,
    BookOpen, CheckCircle,
    XCircle,
    Clock
} from "lucide-react";



interface Props {
    open: boolean;
    onClose: () => void;
    application: IMemberApplication;
}

/* ===============================
   COMPONENT
================================ */
const MemberApplicationViewDialog = ({
    open,
    onClose,
    application,
}: Props) => {
    if (!application) return null;

    const fullName = `${application.user.firstName} ${application.user.lastName}`;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="min-w-4xl max-h-[90vh] flex flex-col p-0">
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle>Member Application</DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto px-6 pb-6">
                    {/* ===============================
                       PROFILE HEADER
                    =============================== */}
                    <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-muted/40 rounded-lg mb-6">
                        <Avatar className="h-24 w-24 border shadow">
                            <AvatarImage src={application.profileImage ?? ""} />
                            <AvatarFallback className="text-2xl">
                                {getInitials(fullName)}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 text-center sm:text-left">
                            <h2 className="text-2xl font-semibold">
                                {fullName}
                            </h2>

                            <p className="text-muted-foreground flex items-center gap-2 mt-1">
                                <Mail className="h-4 w-4" />
                                {application.user.email}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
                                <Badge
                                    variant={
                                        application.status === "APPROVED"
                                            ? "default"
                                            : application.status === "REJECTED"
                                                ? "destructive"
                                                : "secondary"
                                    }
                                    className="flex items-center gap-1"
                                >
                                    {application.status === "APPROVED" && (
                                        <CheckCircle className="h-3 w-3" />
                                    )}
                                    {application.status === "REJECTED" && (
                                        <XCircle className="h-3 w-3" />
                                    )}
                                    {application.status === "PENDING" && (
                                        <Clock className="h-3 w-3" />
                                    )}
                                    {application.status}
                                </Badge>

                                <Badge variant="outline">
                                    Student ID: {application.studentId}
                                </Badge>
                            </div>
                        </div>
                    </div>

                    {/* ===============================
                       INFORMATION SECTIONS
                    =============================== */}
                    <div className="space-y-6">
                        {/* Applicant Information */}
                        <div>
                            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                <User className="h-5 w-5 text-blue-600" />
                                Applicant Information
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                                <InfoRow
                                    label="Full Name"
                                    value={fullName}
                                />
                                <InfoRow
                                    label="Email"
                                    value={application.user.email}
                                />
                                <InfoRow
                                    label="Student ID"
                                    value={application.studentId}
                                />
                            </div>
                        </div>

                        <Separator />

                        {/* Academic Information */}
                        <div>
                            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                <BookOpen className="h-5 w-5 text-purple-600" />
                                Academic Information
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                                <InfoRow
                                    label="Department"
                                    value={application.department?.name ?? "—"}
                                />
                                <InfoRow
                                    label="Session"
                                    value={application.session?.name ?? "—"}
                                />
                            </div>
                        </div>

                        <Separator />

                        {/* Application Metadata */}
                        <div>
                            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                <Calendar className="h-5 w-5 text-orange-600" />
                                Application Information
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                                <InfoRow
                                    label="Application ID"
                                    value={application.id}
                                />
                                <InfoRow
                                    label="Applied On"
                                    value={formatDateTime(application.createdAt)}
                                />
                                <InfoRow
                                    label="Last Updated"
                                    value={formatDateTime(application.updatedAt)}
                                />
                                <InfoRow
                                    label="Status"
                                    value={application.status}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default MemberApplicationViewDialog;
