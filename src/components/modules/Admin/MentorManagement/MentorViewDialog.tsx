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
  Briefcase,
} from "lucide-react";

interface IMentorViewDialogProps {
  open: boolean;
  onClose: () => void;
  mentor: UserInfo | null;
}

const MentorViewDialog = ({
  open,
  onClose,
  mentor,
}: IMentorViewDialogProps) => {
  if (!mentor) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="min-w-4xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>Mentor Profile</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-muted/40 rounded-lg mb-6">
            <Avatar className="h-24 w-24 border shadow">
              <AvatarImage src={mentor?.profileImage} />
              <AvatarFallback className="text-2xl">
                {getInitials(`${mentor.firstName} ${mentor.lastName}`)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-semibold">
                {mentor.firstName} {mentor.lastName}
              </h2>

              <p className="text-muted-foreground flex items-center gap-2 mt-1">
                <Mail className="h-4 w-4" />
                {mentor.email}
              </p>

              <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
                <Badge variant={mentor.isActive ? "default" : "destructive"}>
                  {mentor.isActive ? "Active" : "Inactive"}
                </Badge>

                <Badge
                  variant={mentor.isVerified ? "secondary" : "outline"}
                  className="flex items-center gap-1"
                >
                  {mentor.isVerified ? (
                    <ShieldCheck className="h-3 w-3" />
                  ) : (
                    <ShieldX className="h-3 w-3" />
                  )}
                  {mentor.isVerified ? "Verified" : "Unverified"}
                </Badge>

                <Badge variant="outline">{mentor.role}</Badge>
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
                <InfoRow label="User ID" value={mentor.id} />
                <InfoRow label="Role" value={mentor.role} />
                <InfoRow
                  label="Verification Status"
                  value={mentor.isVerified ? "Verified" : "Not Verified"}
                />
                <InfoRow
                  label="Account Status"
                  value={mentor.isActive ? "Active" : "Inactive"}
                />
              </div>
            </div>

            <Separator />

            {/* Mentor Information */}
            <div>
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-emerald-600" />
                Mentor Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                <InfoRow
                  label="Expertise"
                  value={mentor.mentor?.expertise || "Not specified"}
                />
                <InfoRow
                  label="Designation"
                  value={mentor.mentor?.designation || "Not specified"}
                />
                <InfoRow
                  label="Experience"
                  value={mentor.mentor?.experience || "Not specified"}
                />
                <InfoRow
                  label="GitHub"
                  value={mentor.mentor?.github || "Not provided"}
                />
                <InfoRow
                  label="LinkedIn"
                  value={mentor.mentor?.linkedin || "Not provided"}
                />
                <InfoRow
                  label="Portfolio"
                  value={mentor.mentor?.portfolio || "Not provided"}
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

              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                <InfoRow label="Email Address" value={mentor.email} />
                <InfoRow
                  label="Phone Number"
                  value={mentor.phone || "Not provided"}
                />
              </div> */}
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
                  label="Joined On"
                  value={formatDateTime(mentor.createdAt)}
                />
                <InfoRow
                  label="Last Updated"
                  value={formatDateTime(mentor.updatedAt)}
                />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MentorViewDialog;
