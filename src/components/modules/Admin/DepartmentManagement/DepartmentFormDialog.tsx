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
import { createDepartment } from "@/services/Admin/department/department";

import { IInputErrorState } from "@/types/action";
import { useActionState, useEffect, useRef } from "react";
import toast from "react-hot-toast";

interface Props {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function DepartmentFormDialog({
    open,
    onClose,
    onSuccess,
}: Props) {
    const formRef = useRef<HTMLFormElement>(null);

    const initialState: IInputErrorState = { success: false };

    const [state, formAction, pending] = useActionState(
        createDepartment,
        initialState
    );

    useEffect(() => {
        if (state.success) {
            toast.success(state.message || "Department created");
            onSuccess();
            formRef.current?.reset();
            onClose();
        } else if (state.message) {
            toast.error(state.message);
        }
    }, [state, onClose, onSuccess]);

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Department</DialogTitle>
                </DialogHeader>

                <form ref={formRef} action={formAction} className="space-y-4">
                    <Field>
                        <FieldLabel>Name</FieldLabel>
                        <Input
                            name="name"
                            placeholder="Computer Science"
                        />
                    </Field>

                    <div className="flex justify-end gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={pending}>
                            {pending ? "Saving..." : "Create"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
