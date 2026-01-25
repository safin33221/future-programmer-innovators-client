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
import { createNotice } from "@/services/notice/notice.service";
import { IInputErrorState } from "@/types/action";

import { useActionState, useCallback, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";

interface INoticeFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const NoticeFormDialog = ({
    open,
    onClose,
    onSuccess,
}: INoticeFormDialogProps) => {
    const formRef = useRef<HTMLFormElement>(null);
    const initialState: IInputErrorState = {
        success: false,
    };

    const [state, formAction, pending] = useActionState(
        createNotice,
        initialState
    );
    const prevStateRef = useRef(state);


    // ✅ define BEFORE useEffect
    const handleClose = useCallback(() => {
        formRef.current?.reset();
        onClose();
    }, [onClose]);

    useEffect(() => {
        if (state === prevStateRef.current) return;
        prevStateRef.current = state;

        if (state?.success) {
            toast.success(state.message || "Notice created successfully");
            onSuccess();
            handleClose();
        } else if (state && !state.success && state.message) {
            toast.error(state.message);
        }
    }, [state, onSuccess, handleClose]);

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Notice</DialogTitle>
                </DialogHeader>

                <form ref={formRef} action={formAction} className="space-y-4">
                    {/* Title */}
                    <Field>
                        <FieldLabel htmlFor="title">Title</FieldLabel>
                        <Input
                            id="title"
                            name="title"
                            placeholder="Important Announcement"
                            defaultValue={state?.formData?.title || ""}
                        />
                        {/* <InputFieldError field="title" state={state} /> */}
                    </Field>

                    {/* Content */}
                    <Field>
                        <FieldLabel htmlFor="content">Content</FieldLabel>
                        <Textarea
                            id="content"
                            name="content"
                            rows={5}
                            placeholder="Write notice details here..."
                            defaultValue={state?.formData?.content || ""}
                        />
                        {/* <InputFieldError field="content" state={state} /> */}
                    </Field>

                    <div className="flex justify-end gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                            disabled={pending}
                        >
                            Cancel
                        </Button>

                        <Button type="submit" disabled={pending}>
                            {pending ? "Saving..." : "Create Notice"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default NoticeFormDialog;
