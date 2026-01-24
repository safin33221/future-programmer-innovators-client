"use client";

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
import { IDepartment } from "@/types/department/department.interface";


import {
    Building2,
    Users,
    Calendar,
} from "lucide-react";


interface IDepartmentViewDialogProps {
    open: boolean;
    onClose: () => void;
    department: IDepartment | null;
}

const DepartmentViewDialog = ({
    open,
    onClose,
    department,
}: IDepartmentViewDialogProps) => {
    if (!department) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="min-w-4xl max-h-[90vh] flex flex-col p-0">
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle>Department Details</DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto px-6 pb-6">
                    {/* Department Header */}
                    <div className="flex flex-col gap-4 p-6 bg-muted/40 rounded-lg mb-6">
                        <h2 className="text-2xl font-semibold flex items-center gap-2">
                            <Building2 className="h-6 w-6 text-blue-600" />
                            {department.name}
                        </h2>

                        <div className="flex flex-wrap gap-2">
                            <Badge variant="outline">Department</Badge>
                        </div>
                    </div>

                    {/* Information Sections */}
                    <div className="space-y-6">
                        {/* Department Information */}
                        <div>
                            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                <Building2 className="h-5 w-5 text-emerald-600" />
                                Department Information
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                                <InfoRow label="Department ID" value={department.id} />
                                <InfoRow label="Department Name" value={department.name} />
                            </div>
                        </div>

                        <Separator />

                        {/* Statistics */}
                        <div>
                            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                <Users className="h-5 w-5 text-purple-600" />
                                Statistics
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                                <InfoRow
                                    label="Total Members"
                                    value={department._count?.members ?? 0}
                                />
                                <InfoRow
                                    label="Member Applications"
                                    value={department._count?.memberApplications ?? 0}
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
                                    value={formatDateTime(department?.createdAt)}
                                />
                                {department?.updatedAt && (
                                    <InfoRow
                                        label="Last Updated"
                                        value={formatDateTime(department?.updatedAt)}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DepartmentViewDialog;
