/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { createAdmin } from "@/services/user/admin";
import { IInputErrorState } from "@/types/action";
import { UserInfo } from "@/types/user/user.interface";
import { Search, UserPlus } from "lucide-react";
import {
    useActionState,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import { toast } from "react-hot-toast";
import { useDebounce } from "@/hooks/useDebounce";

interface IAdminFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    initialUsers?: UserInfo[];
}

const AdminFormDialog = ({
    open,
    onClose,
    onSuccess,
    initialUsers = [],
}: IAdminFormDialogProps) => {
    const formRef = useRef<HTMLFormElement>(null);

    /* ---------------- Search state (LOCAL ONLY) ---------------- */
    const [searchQuery, setSearchQuery] = useState("");
    const debouncedQuery = useDebounce(searchQuery, 500);

    const [searchResults, setSearchResults] =
        useState<UserInfo[]>(initialUsers);
    console.log({ searchResults });
    const [isSearching, setIsSearching] = useState(false);

    /* ---------------- Selected user ---------------- */
    const [selectedUser, setSelectedUser] = useState<{
        id: string;
        name: string;
        email: string;
    } | null>(null);

    /* ---------------- Action state ---------------- */
    const initialState: IInputErrorState = { success: false };

    const [state, formAction, pending] = useActionState(
        createAdmin,
        initialState
    );
    const prevStateRef = useRef(state);

    /* ---------------- Local user search ---------------- */
    useEffect(() => {
        if (!debouncedQuery) {
            setSearchResults([]);
            return;
        }

        const controller = new AbortController();

        const fetchUsers = async () => {
            try {
                setIsSearching(true);

                const res = await fetch(
                    `/api/users?searchTerm=${encodeURIComponent(
                        debouncedQuery
                    )}&limit=10`,
                    { signal: controller.signal }
                );

                const data = await res.json();
                setSearchResults(data.data ?? []);
                console.log({ data });
            } catch (err: any) {
                if (err.name !== "AbortError") {
                    toast.error("Failed to search users");
                }
            } finally {
                setIsSearching(false);
            }
        };

        fetchUsers();

        return () => controller.abort();
    }, [debouncedQuery]);

    /* ---------------- Select user ---------------- */
    const handleSelectUser = (user: UserInfo) => {
        setSelectedUser({
            id: user.id,
            name:
                `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() ||
                "Unknown",
            email: user.email,
        });
        setSearchQuery("");
        setSearchResults([]);
    };

    /* ---------------- Close dialog ---------------- */
    const handleClose = useCallback(() => {
        formRef.current?.reset();
        setSelectedUser(null);
        setSearchQuery("");
        setSearchResults([]);
        onClose();
    }, [onClose]);

    /* ---------------- Handle action result ---------------- */
    useEffect(() => {
        if (state === prevStateRef.current) return;
        prevStateRef.current = state;

        if (state?.success) {
            toast.success(state.message || "User promoted to admin");
            onSuccess();
            handleClose();
        } else if (state?.message) {
            toast.error(state.message);
        }
    }, [state, onSuccess, handleClose]);

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Make User an Admin</DialogTitle>
                    <p className="text-sm text-gray-500">
                        Search and select a user to promote
                    </p>
                </DialogHeader>

                <form ref={formRef} action={formAction} className="space-y-4">
                    {/* -------- Search user -------- */}
                    {!selectedUser && (
                        <Field>
                            <FieldLabel>Search User</FieldLabel>
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Search by email or name"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <Button type="button" variant="outline" disabled>
                                    <Search className="h-4 w-4" />
                                </Button>
                            </div>

                            {isSearching && (
                                <p className="text-sm text-blue-500 mt-1">
                                    Searching users...
                                </p>
                            )}

                            {!isSearching &&
                                searchQuery &&
                                searchResults.length === 0 && (
                                    <p className="text-sm text-gray-500 mt-1">
                                        No users found for &quot;{searchQuery}&quot;
                                    </p>
                                )}

                            {searchResults.length > 0 && (
                                <div className="border rounded-md mt-2 max-h-60 overflow-y-auto">
                                    {searchResults.map((user) => (
                                        <div
                                            key={user.id}
                                            onClick={() => handleSelectUser(user)}
                                            className="p-3 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer flex justify-between"
                                        >
                                            <div>
                                                <p className="font-medium">
                                                    {user.firstName} {user.lastName}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {user.email}
                                                </p>
                                            </div>
                                            <UserPlus className="h-4 w-4 text-blue-500" />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </Field>
                    )}

                    {/* -------- Selected user -------- */}
                    {selectedUser && (
                        <>
                            <div className="p-4 border rounded bg-blue-50">
                                <p className="font-medium text-blue-700">
                                    Selected User
                                </p>
                                <p className="text-lg font-semibold">
                                    {selectedUser.name}
                                </p>
                                <p className="text-sm text-blue-600">
                                    {selectedUser.email}
                                </p>
                            </div>

                            <input type="hidden" name="userId" value={selectedUser.id} />
                            <input type="hidden" name="email" value={selectedUser.email} />

                            <Field>
                                <FieldLabel>Admin Role</FieldLabel>
                                <select
                                    name="role"
                                    className="w-full p-2 border rounded"
                                    defaultValue="admin"
                                    required
                                >
                                    <option value="admin">Admin</option>
                                    <option value="super_admin">Super Admin</option>
                                    <option value="moderator">Moderator</option>
                                </select>
                            </Field>
                        </>
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
                        <Button
                            type="submit"
                            disabled={pending || !selectedUser}
                        >
                            {pending ? "Promoting..." : "Promote to Admin"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AdminFormDialog;
