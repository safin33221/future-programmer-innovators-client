"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";

import { IInputErrorState } from "@/types/action";
import { createLearningTrack } from "@/services/Admin/learningTrack/learningTrack";

export default function LearningTrackFormDialog({
    open,
    onClose,
    onSuccess,
}: {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}) {
    const formRef = useRef<HTMLFormElement>(null);

    const [name, setName] = useState("");

    const [topics, setTopics] = useState([{ title: "" }]);
    const [roadmaps, setRoadmaps] = useState([{ phase: "", description: "" }]);
    const [careers, setCareers] = useState([{ role: "", details: "" }]);
    const [tools, setTools] = useState([{ name: "" }]);

    const [state, formAction, pending] = useActionState(
        createLearningTrack,
        { success: false } as IInputErrorState
    );

    useEffect(() => {
        if (state?.success) {
            toast.success(state.message || "Learning track created");
            onSuccess();
            onClose();
        }
        if (!state?.success && state?.message) {
            toast.error(state.message);
        }
    }, [state, onClose, onSuccess]);



    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Create Learning Track</DialogTitle>
                </DialogHeader>

                <form ref={formRef} action={formAction} className="space-y-6">
                    {/* BASIC INFO */}
                    <Field>
                        <FieldLabel>Name</FieldLabel>
                        <Input
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </Field>



                    <Field>
                        <FieldLabel>Short Description</FieldLabel>
                        <Input name="shortDesc" required />
                    </Field>

                    <Field>
                        <FieldLabel>Long Description</FieldLabel>
                        <Textarea name="longDesc" rows={4} required />
                    </Field>

                    <Field>
                        <FieldLabel>Duration</FieldLabel>
                        <Input name="duration" placeholder="6 Months" required />
                    </Field>

                    <Field>
                        <FieldLabel>Difficulty</FieldLabel>
                        <select
                            name="difficulty"
                            className="w-full rounded-md border px-3 py-2"
                            required
                        >
                            <option value="">Select</option>
                            <option value="BEGINNER">Beginner</option>
                            <option value="INTERMEDIATE">Intermediate</option>
                            <option value="ADVANCED">Advanced</option>
                        </select>
                    </Field>

                    {/* TOPICS */}
                    <section>
                        <FieldLabel>Topics</FieldLabel>
                        {topics.map((t, i) => (
                            <Input
                                key={i}
                                name={`topics[${i}].title`}
                                value={t.title}
                                onChange={(e) => {
                                    const copy = [...topics];
                                    copy[i].title = e.target.value;
                                    setTopics(copy);
                                }}
                                placeholder={`Topic ${i + 1}`}
                                required
                                className="mb-2"
                            />
                        ))}
                        <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => setTopics([...topics, { title: "" }])}
                        >
                            + Add Topic
                        </Button>
                    </section>

                    {/* ROADMAP */}
                    <section>
                        <FieldLabel>Roadmap</FieldLabel>
                        {roadmaps.map((r, i) => (
                            <div key={i} className="space-y-2 mb-3">
                                <Input
                                    name={`roadmaps[${i}].phase`}
                                    value={r.phase}
                                    onChange={(e) => {
                                        const copy = [...roadmaps];
                                        copy[i].phase = e.target.value;
                                        setRoadmaps(copy);
                                    }}
                                    placeholder="Beginner / Intermediate"
                                />
                                <Textarea
                                    name={`roadmaps[${i}].description`}
                                    value={r.description}
                                    onChange={(e) => {
                                        const copy = [...roadmaps];
                                        copy[i].description = e.target.value;
                                        setRoadmaps(copy);
                                    }}
                                    placeholder="Phase description"
                                />
                                <input
                                    type="hidden"
                                    name={`roadmaps[${i}].order`}
                                    value={i + 1}
                                />
                            </div>
                        ))}
                        <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() =>
                                setRoadmaps([...roadmaps, { phase: "", description: "" }])
                            }
                        >
                            + Add Phase
                        </Button>
                    </section>

                    {/* CAREERS */}
                    <section>
                        <FieldLabel>Career Outcomes</FieldLabel>
                        {careers.map((c, i) => (
                            <div key={i} className="space-y-2 mb-3">
                                <Input
                                    name={`careers[${i}].role`}
                                    value={c.role}
                                    onChange={(e) => {
                                        const copy = [...careers];
                                        copy[i].role = e.target.value;
                                        setCareers(copy);
                                    }}
                                    placeholder="Frontend Developer"
                                />
                                <Textarea
                                    name={`careers[${i}].details`}
                                    value={c.details}
                                    onChange={(e) => {
                                        const copy = [...careers];
                                        copy[i].details = e.target.value;
                                        setCareers(copy);
                                    }}
                                    placeholder="Career details"
                                />
                            </div>
                        ))}
                        <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() =>
                                setCareers([...careers, { role: "", details: "" }])
                            }
                        >
                            + Add Career
                        </Button>
                    </section>

                    {/* TOOLS */}
                    <section>
                        <FieldLabel>Tools</FieldLabel>
                        {tools.map((t, i) => (
                            <Input
                                key={i}
                                name={`tools[${i}].name`}
                                value={t.name}
                                onChange={(e) => {
                                    const copy = [...tools];
                                    copy[i].name = e.target.value;
                                    setTools(copy);
                                }}
                                placeholder="React / Node / Git"
                                className="mb-2"
                            />
                        ))}
                        <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => setTools([...tools, { name: "" }])}
                        >
                            + Add Tool
                        </Button>
                    </section>

                    {/* ACTIONS */}
                    <div className="flex justify-end gap-2 pt-4">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={pending}>
                            {pending ? "Saving..." : "Create Track"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
