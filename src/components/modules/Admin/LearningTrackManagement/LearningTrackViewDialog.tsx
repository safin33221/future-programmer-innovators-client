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
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    Clock, BookOpen,
    TrendingUp,
    Wrench,
    Map,
    Briefcase, FileText,
    CheckCircle,
    XCircle
} from "lucide-react";
import { format } from "date-fns";
import { ILearningTrack } from "@/types/learningTrack/learningTrack.interface";

interface Props {
    open: boolean;
    onClose: () => void;
    track: ILearningTrack | null;
}

export default function LearningTrackViewDialog({
    open,
    onClose,
    track,
}: Props) {
    if (!track) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-6xl max-h-[90vh] p-0">
                {/* ===== HEADER ===== */}
                <DialogHeader className="px-6 pt-6">
                    <DialogTitle className="text-2xl flex items-center gap-2">
                        <BookOpen className="h-6 w-6" />
                        {track.name}
                    </DialogTitle>

                    <DialogDescription className="flex items-center gap-3 flex-wrap">
                        <Badge
                            variant={track.isActive ? "default" : "secondary"}
                        >
                            {track.isActive ? (
                                <CheckCircle className="h-3 w-3 mr-1" />
                            ) : (
                                <XCircle className="h-3 w-3 mr-1" />
                            )}
                            {track.isActive ? "Active" : "Inactive"}
                        </Badge>

                        {track.createdAt && (
                            <span className="text-sm text-muted-foreground">
                                Created{" "}
                                {format(new Date(track.createdAt), "PP")}
                            </span>
                        )}
                    </DialogDescription>
                </DialogHeader>

                <Separator />

                <ScrollArea className="h-[calc(90vh-180px)]">
                    <div className="px-6 py-4 space-y-6">
                        {/* ===== SUMMARY STATS ===== */}
                        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Stat label="Members" value={track.memberCount} />
                            <Stat
                                label="Applications"
                                value={track.applicationCount}
                            />
                            <Stat
                                label="Topics"
                                value={
                                    track.topicCount ||
                                    track.topics?.length ||
                                    0
                                }
                            />
                            <Stat
                                label="Tools"
                                value={
                                    track.toolCount ||
                                    track.tools?.length ||
                                    0
                                }
                            />
                        </section>

                        {/* ===== BASIC INFO ===== */}
                        <section className="space-y-3">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                <FileText className="h-5 w-5" />
                                Overview
                            </h3>

                            <div className="grid md:grid-cols-3 gap-4">
                                <Info label="Difficulty">
                                    <Badge variant="outline">
                                        <TrendingUp className="h-3 w-3 mr-1" />
                                        {track.difficulty}
                                    </Badge>
                                </Info>

                                <Info label="Duration">
                                    <Badge variant="outline">
                                        <Clock className="h-3 w-3 mr-1" />
                                        {track.duration}
                                    </Badge>
                                </Info>

                                <Info label="Slug">
                                    <code className="text-xs bg-muted px-2 py-1 rounded">
                                        {track.slug}
                                    </code>
                                </Info>
                            </div>

                            <p className="text-sm text-muted-foreground">
                                {track.shortDesc}
                            </p>

                            <div className="prose prose-sm max-w-none">
                                {track.longDesc}
                            </div>
                        </section>

                        {/* ===== COLLAPSIBLE SECTIONS ===== */}
                        <Accordion type="multiple" className="space-y-2">
                            {/* TOPICS */}
                            <AccordionItem value="topics">
                                <AccordionTrigger>
                                    <BookOpen className="h-4 w-4 mr-2" />
                                    Topics
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="space-y-2">
                                        {track.topics?.map((t, i) => (
                                            <div
                                                key={t.id || i}
                                                className="p-3 border rounded-lg"
                                            >
                                                {t.order || i + 1}. {t.title}
                                            </div>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            {/* ROADMAP */}
                            <AccordionItem value="roadmap">
                                <AccordionTrigger>
                                    <Map className="h-4 w-4 mr-2" />
                                    Learning Roadmap
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="space-y-3">
                                        {track.roadmaps?.map((r, i) => (
                                            <div
                                                key={r.id || i}
                                                className="border-l-4 border-primary pl-4"
                                            >
                                                <h4 className="font-medium">
                                                    {r.order || i + 1}.{" "}
                                                    {r.phase}
                                                </h4>
                                                <p className="text-sm text-muted-foreground">
                                                    {r.description}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            {/* CAREERS */}
                            <AccordionItem value="careers">
                                <AccordionTrigger>
                                    <Briefcase className="h-4 w-4 mr-2" />
                                    Career Outcomes
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="grid gap-3">
                                        {track.careers?.map((c, i) => (
                                            <div
                                                key={c.id || i}
                                                className="p-4 border rounded-lg"
                                            >
                                                <h4 className="font-medium">
                                                    {c.role}
                                                </h4>
                                                <p className="text-sm">
                                                    {c.details}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            {/* TOOLS */}
                            <AccordionItem value="tools">
                                <AccordionTrigger>
                                    <Wrench className="h-4 w-4 mr-2" />
                                    Tools & Technologies
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="flex flex-wrap gap-2">
                                        {track.tools?.map((tool, i) => (
                                            <Badge
                                                key={tool.id || i}
                                                variant="secondary"
                                            >
                                                {tool.name}
                                            </Badge>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </ScrollArea>

                {/* ===== FOOTER ===== */}
                <div className="flex justify-between items-center px-6 py-4 border-t bg-background">
                    <Button variant="outline" onClick={onClose}>
                        Close
                    </Button>
                    <Button>Edit Track</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

/* ---------- SMALL UI HELPERS ---------- */

function Stat({ label, value }: { label: string; value?: number }) {
    return (
        <div className="text-center border rounded-lg p-3">
            <p className="text-2xl font-bold">{value || 0}</p>
            <p className="text-sm text-muted-foreground">{label}</p>
        </div>
    );
}

function Info({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div>
            <p className="text-xs text-muted-foreground mb-1">{label}</p>
            {children}
        </div>
    );
}
