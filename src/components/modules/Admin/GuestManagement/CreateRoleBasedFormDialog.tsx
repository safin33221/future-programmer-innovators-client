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
import { createUserByRole } from "@/services/user/createRoleBaseUser";

import { IInputErrorState } from "@/types/action";

import {
    useActionState,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import { toast } from "react-hot-toast";

interface Props {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

type Role = "ADMIN" | "MENTOR" | "MODERATOR";

const CreateRoleBasedFormDialog = ({ open, onClose, onSuccess }: Props) => {
    const formRef = useRef<HTMLFormElement>(null);
    const [role, setRole] = useState<Role>("ADMIN");

    const initialState: IInputErrorState = { success: false };
    const [state, formAction, pending] = useActionState(
        createUserByRole,
        initialState
    );
    const prevRef = useRef(state);

    const handleClose = useCallback(() => {
        formRef.current?.reset();
        setRole("ADMIN");
        onClose();
    }, [onClose]);

    useEffect(() => {
        if (state === prevRef.current) return;
        prevRef.current = state;

        let timeoutId: number | undefined;

        if (state.success) {
            toast.success(state.message || "User created successfully");
            onSuccess();
            // schedule the close to avoid calling setState synchronously within the effect
            timeoutId = window.setTimeout(() => {
                handleClose();
            }, 0);
        } else if (state.message) {
            toast.error(state.message);
        }

        return () => {
            if (timeoutId !== undefined) clearTimeout(timeoutId);
        };
    }, [state, handleClose, onSuccess]);

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Create User</DialogTitle>
                </DialogHeader>

                <form ref={formRef} action={formAction} className="space-y-4">
                    {/* COMMON FIELDS */}
                    <Field>
                        <FieldLabel>Email</FieldLabel>
                        <Input name="email" required />
                    </Field>


                    <Field>
                        <FieldLabel>Role</FieldLabel>
                        <select
                            name="role"
                            className="w-full p-2 border rounded"
                            value={role}
                            onChange={(e) =>
                                setRole(e.target.value as Role)
                            }
                        >
                            <option value="ADMIN">Admin</option>

                            <option value="MENTOR">Mentor</option>
                            <option value="MODERATOR">Moderator</option>
                        </select>
                    </Field>

                    {/* ================= ROLE BASED ================= */}

                    {/* ADMIN */}
                    {role === "ADMIN" && (
                        <>
                            <Field>
                                <FieldLabel>Admin Level</FieldLabel>
                                <select
                                    name="adminLevel"
                                    className="w-full p-2 border rounded"
                                >
                                    <option value="BASIC">Basic</option>
                                    <option value="SUPER">Super</option>
                                </select>
                            </Field>

                            <Field>
                                <FieldLabel>Department</FieldLabel>
                                <Input name="department" />
                            </Field>
                        </>
                    )}



                    {/* MENTOR */}
                    {role === "MENTOR" && (
                        <>
                            <Field>
                                <FieldLabel>Expertise</FieldLabel>
                                <Input name="expertise" required />
                            </Field>

                            <Field>
                                <FieldLabel>Designation</FieldLabel>
                                <Input name="designation" required />
                            </Field>

                            <Field>
                                <FieldLabel>Experience</FieldLabel>
                                <Input name="experience" />
                            </Field>
                        </>
                    )}

                    {/* MODERATOR */}
                    {role === "MODERATOR" && (
                        <Field>
                            <FieldLabel>Moderation Level</FieldLabel>
                            <select
                                name="moderationLevel"
                                className="w-full p-2 border rounded"
                            >
                                <option value="BASIC">Basic</option>
                                <option value="ADVANCED">Advanced</option>
                            </select>
                        </Field>
                    )}

                    <div className="flex justify-end gap-2 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                            disabled={pending}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={pending}>
                            {pending ? "Creating..." : "Create"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateRoleBasedFormDialog;
