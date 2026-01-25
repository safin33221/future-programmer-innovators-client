"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Calendar,
    Clock,
    Users,
    BookOpen,
    TrendingUp,
    Wrench,
    Map,
    Briefcase,
    User,
    FileText,
    CheckCircle,
    XCircle
} from "lucide-react";
import { format } from "date-fns";
import { ILearningTrack } from "@/types/learningTrack/learningTrack.interface";
import Image from "next/image";

interface Props {
    open: boolean;
    onClose: () => void;
    track: ILearningTrack | null;
}

export default function LearningTrackViewDialog({ open, onClose, track }: Props) {
    if (!track) return null

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-7xl max-h-[90vh] overflow-hidden">
                <DialogHeader>
                    <DialogTitle className="text-2xl flex items-center gap-2">
                        <BookOpen className="h-6 w-6" />
                        {track.name}
                    </DialogTitle>
                    <DialogDescription>
                        {track.createdAt && (
                            <>Created: {format(new Date(track.createdAt), "PPpp")}</>
                        )}
                    </DialogDescription>
                </DialogHeader>

                <ScrollArea className="h-[calc(90vh-200px)] pr-4">
                    <div className="space-y-6">
                        {/* ===== BASIC INFO ===== */}
                        <section className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                    <FileText className="h-5 w-5" />
                                    Basic Information
                                </h3>
                                <Badge variant={track.isActive ? "default" : "secondary"}>
                                    {track.isActive ? (
                                        <CheckCircle className="h-3 w-3 mr-1" />
                                    ) : (
                                        <XCircle className="h-3 w-3 mr-1" />
                                    )}
                                    {track.isActive ? "Active" : "Inactive"}
                                </Badge>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Short Description</p>
                                    <p className="mt-1">{track.shortDesc}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Slug</p>
                                    <code className="text-sm bg-muted px-2 py-1 rounded mt-1 inline-block">
                                        {track.slug}
                                    </code>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="flex items-center gap-2">
                                    <Badge variant="outline" className="flex items-center gap-1">
                                        <TrendingUp className="h-3 w-3" />
                                        {track.difficulty}
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge variant="outline" className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        {track.duration}
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge variant="outline" className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        {track.memberCount} Members
                                    </Badge>
                                </div>
                            </div>

                            <div>
                                <p className="text-sm font-medium text-muted-foreground mb-2">Long Description</p>
                                <div className="prose prose-sm max-w-none">
                                    {track.longDesc}
                                </div>
                            </div>
                        </section>

                        <Separator />

                        {/* ===== TOPICS ===== */}
                        <section className="space-y-3">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                <BookOpen className="h-5 w-5" />
                                Topics ({track.topicCount || track.topics?.length || 0})
                            </h3>

                            <div className="grid gap-2">
                                {track.topics?.map((topic, index) => (
                                    <div
                                        key={topic.id || index}
                                        className="flex items-start gap-3 p-3 border rounded-lg"
                                    >
                                        <div className="shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                                            <span className="text-sm font-medium">{topic.order || index + 1}</span>
                                        </div>
                                        <div>
                                            <h4 className="font-medium">{topic.title}</h4>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <Separator />

                        {/* ===== ROADMAP ===== */}
                        <section className="space-y-3">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                <Map className="h-5 w-5" />
                                Learning Roadmap ({track.roadmapCount || track.roadmaps?.length || 0})
                            </h3>

                            <div className="space-y-4">
                                {track.roadmaps?.map((roadmap, index) => (
                                    <div
                                        key={roadmap.id || index}
                                        className="border-l-4 border-primary pl-4 py-2"
                                    >
                                        <div className="flex items-center gap-2 mb-1">
                                            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                                                {roadmap.order || index + 1}
                                            </div>
                                            <h4 className="font-semibold">{roadmap.phase}</h4>
                                        </div>
                                        <p className="text-sm text-muted-foreground">{roadmap.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <Separator />

                        {/* ===== CAREER OUTCOMES ===== */}
                        <section className="space-y-3">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                <Briefcase className="h-5 w-5" />
                                Career Outcomes ({track.careerCount || track.careers?.length || 0})
                            </h3>

                            <div className="grid gap-3">
                                {track.careers?.map((career, index) => (
                                    <div
                                        key={career.id || index}
                                        className="p-4 border rounded-lg bg-card"
                                    >
                                        <h4 className="font-semibold mb-2">{career.role}</h4>
                                        <p className="text-sm">{career.details}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <Separator />

                        {/* ===== TOOLS & TECHNOLOGIES ===== */}
                        <section className="space-y-3">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                <Wrench className="h-5 w-5" />
                                Tools & Technologies ({track.toolCount || track.tools?.length || 0})
                            </h3>

                            <div className="flex flex-wrap gap-2">
                                {track.tools?.map((tool, index) => (
                                    <Badge
                                        key={tool.id || index}
                                        variant="secondary"
                                        className="px-3 py-1.5"
                                    >
                                        {tool.icon && (
                                            <Image
                                                src={tool.icon}
                                                alt={tool.name}
                                                className="w-4 h-4 mr-2"
                                                height={16}
                                                width={16}
                                            />
                                        )}
                                        {tool.name}
                                    </Badge>
                                ))}
                            </div>
                        </section>

                        <Separator />

                        {/* ===== MEMBERS ===== */}
                        {track.members && track.members.length > 0 && (
                            <>
                                <section className="space-y-3">
                                    <h3 className="text-lg font-semibold flex items-center gap-2">
                                        <Users className="h-5 w-5" />
                                        Current Members ({track.memberCount || track.members.length})
                                    </h3>

                                    <div className="grid gap-2">
                                        {track.members.slice(0, 5).map((member, index) => (
                                            <div
                                                key={member.id || index}
                                                className="flex items-center gap-3 p-3 border rounded-lg"
                                            >
                                                {member.profileImage ? (
                                                    <Image
                                                        src={member.profileImage}
                                                        alt={member.user?.fullName || "Member"}
                                                        className="w-10 h-10 rounded-full"
                                                        height={16}
                                                        width={16}
                                                    />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                        <User className="h-5 w-5 text-primary" />
                                                    </div>
                                                )}
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-medium truncate">
                                                        {member.user?.fullName || `${member.user?.firstName} ${member.user?.lastName}`}
                                                    </h4>
                                                    <p className="text-sm text-muted-foreground truncate">
                                                        {member.studentId} • {member.user?.email}
                                                    </p>
                                                </div>
                                                {member.department && (
                                                    <Badge variant="outline" className="text-xs">
                                                        {member.department.name}
                                                    </Badge>
                                                )}
                                            </div>
                                        ))}

                                        {track.members.length > 5 && (
                                            <div className="text-center py-2 text-sm text-muted-foreground">
                                                +{track.members.length - 5} more members
                                            </div>
                                        )}
                                    </div>
                                </section>

                                <Separator />
                            </>
                        )}

                        {/* ===== APPLICATIONS ===== */}
                        {track.applications && track.applications.length > 0 && (
                            <section className="space-y-3">
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                    <FileText className="h-5 w-5" />
                                    Pending Applications ({track.applicationCount || track.applications.length})
                                </h3>

                                <div className="space-y-2">
                                    {track.applications.slice(0, 3).map((application, index) => (
                                        <div
                                            key={application.id || index}
                                            className="flex items-center justify-between p-3 border rounded-lg"
                                        >
                                            <div className="flex items-center gap-3">
                                                {application.user?.profileImage ? (
                                                    <Image
                                                        height={100}
                                                        width={100}
                                                        src={application.user.profileImage}
                                                        alt={application.user?.fullName || "Applicant"}
                                                        className="w-8 h-8 rounded-full"
                                                    />
                                                ) : (
                                                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                                                        <User className="h-4 w-4" />
                                                    </div>
                                                )}
                                                <div>
                                                    <h4 className="font-medium text-sm">
                                                        {application.user?.fullName || `${application.user?.firstName} ${application.user?.lastName}`}
                                                    </h4>
                                                    <p className="text-xs text-muted-foreground">
                                                        {application.user?.email}
                                                    </p>
                                                </div>
                                            </div>
                                            <Badge
                                                variant={
                                                    application.status === 'APPROVED' ? 'default' :
                                                        application.status === 'REJECTED' ? 'destructive' :
                                                            'secondary'
                                                }
                                            >
                                                {application.status}
                                            </Badge>
                                        </div>
                                    ))}

                                    {track.applications.length > 3 && (
                                        <div className="text-center py-2 text-sm text-muted-foreground">
                                            +{track.applications.length - 3} more applications
                                        </div>
                                    )}
                                </div>
                            </section>
                        )}

                        {/* ===== STATISTICS ===== */}
                        <section className="bg-muted/50 rounded-lg p-4">
                            <h3 className="text-lg font-semibold mb-3">Statistics</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="text-center">
                                    <p className="text-2xl font-bold">{track.memberCount || 0}</p>
                                    <p className="text-sm text-muted-foreground">Members</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold">{track.applicationCount || 0}</p>
                                    <p className="text-sm text-muted-foreground">Applications</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold">{track.topicCount || track.topics?.length || 0}</p>
                                    <p className="text-sm text-muted-foreground">Topics</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold">{track.toolCount || track.tools?.length || 0}</p>
                                    <p className="text-sm text-muted-foreground">Tools</p>
                                </div>
                            </div>
                        </section>
                    </div>
                </ScrollArea>

                <div className="flex justify-end gap-2 pt-4 border-t">
                    <Button variant="outline" onClick={onClose}>
                        Close
                    </Button>
                    <Button>
                        Edit Track
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}