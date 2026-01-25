"use client";

import { useActionState, useCallback, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";


import { IInputErrorState } from "@/types/action";
import { createSession } from "@/services/Admin/session/session";

interface SessionFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const SessionFormDialog = ({
    open,
    onClose,
    onSuccess,
}: SessionFormDialogProps) => {
    const formRef = useRef<HTMLFormElement>(null);

    const initialState: IInputErrorState = {
        success: false,
    };

    const [state, formAction, pending] = useActionState(
        createSession,
        initialState
    );

    const prevStateRef = useRef(state);

    const handleClose = useCallback(() => {
        formRef.current?.reset();
        onClose();
    }, [onClose]);

    useEffect(() => {
        if (state === prevStateRef.current) return;
        prevStateRef.current = state;

        if (state?.success) {
            toast.success(state.message || "Session created successfully");
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
                    <DialogTitle>Create Session</DialogTitle>
                </DialogHeader>

                <form
                    ref={formRef}
                    action={formAction}
                    className="space-y-4"
                >
                    {/* Session Name */}
                    <Field>
                        <FieldLabel htmlFor="name">Session Name</FieldLabel>
                        <Input
                            id="name"
                            name="name"
                            placeholder="22-23  ,  23-24  , etc."
                            defaultValue={state?.formData?.name || ""}
                            required
                        />
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
                            {pending ? "Saving..." : "Create Session"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default SessionFormDialog;
