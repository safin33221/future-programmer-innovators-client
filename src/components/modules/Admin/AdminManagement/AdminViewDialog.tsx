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
import { UserInfo } from "@/types/user/user.interface";
import {
    Calendar,
    Mail,
    Phone,
    User,
    ShieldCheck,
    ShieldX,
    Shield,
} from "lucide-react";

interface IAdminViewDetailDialogProps {
    open: boolean;
    onClose: () => void;
    admin: UserInfo | null;
}

const AdminViewDetailDialog = ({
    open,
    onClose,
    admin,
}: IAdminViewDetailDialogProps) => {
    if (!admin) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="min-w-4xl max-h-[90vh] flex flex-col p-0">
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle>Admin Profile</DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto px-6 pb-6">
                    {/* Profile Header */}
                    <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-muted/40 rounded-lg mb-6">
                        <Avatar className="h-24 w-24 border shadow">
                            <AvatarImage src={admin?.profileImage} />
                            <AvatarFallback className="text-2xl">
                                {getInitials(
                                    `${admin.firstName} ${admin.lastName}`
                                )}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 text-center sm:text-left">
                            <h2 className="text-2xl font-semibold">
                                {admin.firstName} {admin.lastName}
                            </h2>

                            <p className="text-muted-foreground flex items-center gap-2 mt-1">
                                <Mail className="h-4 w-4" />
                                {admin.email}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
                                <Badge
                                    variant={admin.isActive ? "default" : "destructive"}
                                >
                                    {admin.isActive ? "Active" : "Inactive"}
                                </Badge>

                                <Badge
                                    variant={admin.isVerified ? "secondary" : "outline"}
                                    className="flex items-center gap-1"
                                >
                                    {admin.isVerified ? (
                                        <ShieldCheck className="h-3 w-3" />
                                    ) : (
                                        <ShieldX className="h-3 w-3" />
                                    )}
                                    {admin.isVerified ? "Verified" : "Unverified"}
                                </Badge>

                                <Badge
                                    variant="outline"
                                    className="flex items-center gap-1 font-semibold"
                                >
                                    <Shield className="h-3 w-3" />
                                    {admin.role}
                                </Badge>
                            </div>
                        </div>
                    </div>

                    {/* Information Sections */}
                    <div className="space-y-6">
                        {/* Account Information */}
                        <div>
                            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                <User className="h-5 w-5 text-blue-600" />
                                Account Information
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                                <InfoRow label="Admin ID" value={admin.id} />
                                <InfoRow label="Role" value={admin.role} />
                                <InfoRow
                                    label="Verification Status"
                                    value={admin.isVerified ? "Verified" : "Not Verified"}
                                />
                                <InfoRow
                                    label="Account Status"
                                    value={admin.isActive ? "Active" : "Inactive"}
                                />
                            </div>
                        </div>

                        <Separator />

                        {/* Contact Information */}
                        <div>
                            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                <Phone className="h-5 w-5 text-purple-600" />
                                Contact Information
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                                <InfoRow label="Email Address" value={admin.email} />
                                {/* <InfoRow
                                    label="Phone Number"
                                    value={admin.admin. || "Not provided"}
                                /> */}
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
                                    label="Admin Since"
                                    value={formatDateTime(admin.createdAt)}
                                />
                                <InfoRow
                                    label="Last Updated"
                                    value={formatDateTime(admin.updatedAt)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AdminViewDetailDialog;
