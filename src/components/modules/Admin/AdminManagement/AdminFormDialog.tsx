/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import SearchFilter from "@/components/shared/SearchFilter";
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

import { useActionState, useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";

interface IAdminFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    initialUsers?: UserInfo[]; // Optional initial data
}

const AdminFormDialog = ({
    open,
    onClose,
    onSuccess,
    initialUsers = []
}: IAdminFormDialogProps) => {
    const formRef = useRef<HTMLFormElement>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedUser, setSelectedUser] = useState<{
        id: string;
        name: string;
        email: string;
    } | null>(null);
    const [searchResults, setSearchResults] = useState<any[]>(initialUsers);
    const [isSearching, setIsSearching] = useState(false);
    const [allUsers, setAllUsers] = useState<any[]>(initialUsers);

    const initialState: IInputErrorState = {
        success: false,
    };

    const [state, formAction, pending] = useActionState(
        createAdmin,
        initialState
    );
    const prevStateRef = useRef(state);








    const handleSelectUser = (user: any) => {
        setSelectedUser({
            id: user.id,
            name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Unknown',
            email: user.email,
        });
        setSearchResults([]);
        setSearchQuery("");
    };

    // ✅ define BEFORE useEffect
    const handleClose = useCallback(() => {
        formRef.current?.reset();
        setSelectedUser(null);
        setSearchQuery("");
        setSearchResults(allUsers.slice(0, 10));
        onClose();
    }, [onClose, allUsers]);

    useEffect(() => {
        if (state === prevStateRef.current) return;
        prevStateRef.current = state;

        if (state?.success) {
            toast.success(state.message || "User promoted to admin successfully");
            onSuccess();
            // eslint-disable-next-line react-hooks/set-state-in-effect
            handleClose();
        } else if (state && !state.success && state.message) {
            toast.error(state.message);
        }
    }, [state, onSuccess, handleClose]);

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Make User an Admin</DialogTitle>
                    <p className="text-sm text-gray-500">
                        Search and select a user to promote as admin
                    </p>
                </DialogHeader>

                <form ref={formRef} action={formAction} className="space-y-4">
                    {/* Search User */}
                    {!selectedUser && (
                        <Field>
                            <FieldLabel htmlFor="search">
                                Search User by Email, First Name, or Last Name
                            </FieldLabel>
                            <div className="flex gap-2">
                                <SearchFilter
                                    paramName="searchTerm"
                                    placeholder="Search admins..."

                                />
                                <Button
                                    type="button"

                                    disabled={isSearching}
                                >
                                    {isSearching ? (
                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-white" />
                                    ) : (
                                        <Search className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>

                            {/* Search status */}
                            {isSearching && (
                                <p className="text-sm text-blue-500">Searching users...</p>
                            )}

                            {!isSearching && searchQuery && searchResults.length === 0 && (
                                <p className="text-sm text-gray-500">No users found matching &quot;{searchQuery}&quot;</p>
                            )}

                            {/* Search Results */}
                            {searchResults.length > 0 && (
                                <div className="mt-2">
                                    <p className="text-sm font-medium mb-2">
                                        {searchQuery ? 'Search Results' : 'Recent Users'} ({searchResults.length})
                                    </p>
                                    <div className="border rounded-md max-h-60 overflow-y-auto">
                                        {searchResults.map((user) => (
                                            <div
                                                key={user.id}
                                                className="p-3 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer flex items-center justify-between"
                                                onClick={() => handleSelectUser(user)}
                                            >
                                                <div>
                                                    <p className="font-medium">
                                                        {user.firstName || ''} {user.lastName || ''}
                                                        {!user.firstName && !user.lastName && 'No Name'}
                                                    </p>
                                                    <p className="text-sm text-gray-500">{user.email}</p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="text-xs px-2 py-1 bg-gray-100 rounded">
                                                            {user.role || 'user'}
                                                        </span>
                                                        {user.isVerified && (
                                                            <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">
                                                                Verified
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <UserPlus className="h-4 w-4 text-blue-500" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </Field>
                    )}

                    {/* Selected User Display */}
                    {selectedUser && (
                        <>
                            <div className="p-4 border rounded-md bg-blue-50">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-medium text-blue-700">Selected User:</p>
                                        <p className="text-lg font-semibold">{selectedUser.name}</p>
                                        <p className="text-sm text-blue-600">{selectedUser.email}</p>
                                    </div>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setSelectedUser(null)}
                                    >
                                        Change
                                    </Button>
                                </div>
                            </div>

                            {/* Hidden input fields for selected user */}
                            <input
                                type="hidden"
                                name="userId"
                                value={selectedUser.id}
                                readOnly
                            />
                            <input
                                type="hidden"
                                name="name"
                                value={selectedUser.name}
                                readOnly
                            />
                            <input
                                type="hidden"
                                name="email"
                                value={selectedUser.email}
                                readOnly
                            />

                            {/* Role Selection */}
                            <Field>
                                <FieldLabel htmlFor="role">Admin Role</FieldLabel>
                                <select
                                    id="role"
                                    name="role"
                                    className="w-full p-2 border rounded-md"
                                    defaultValue="admin"
                                    required
                                >
                                    <option value="admin">Admin</option>
                                    <option value="super_admin">Super Admin</option>
                                    <option value="moderator">Moderator</option>
                                    <option value="editor">Editor</option>
                                    <option value="support">Support Staff</option>
                                </select>
                                <p className="text-sm text-gray-500 mt-1">
                                    Select the role for this user
                                </p>
                            </Field>

                            {/* Additional permissions (optional) */}
                            <Field>
                                <FieldLabel>Additional Permissions</FieldLabel>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            name="canManageUsers"
                                            className="h-4 w-4 rounded border-gray-300"
                                        />
                                        <span className="text-sm">Can manage users</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            name="canManageContent"
                                            className="h-4 w-4 rounded border-gray-300"
                                        />
                                        <span className="text-sm">Can manage content</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            name="canManageSettings"
                                            className="h-4 w-4 rounded border-gray-300"
                                        />
                                        <span className="text-sm">Can manage settings</span>
                                    </label>
                                </div>
                            </Field>
                        </>
                    )}

                    <div className="flex justify-end gap-2 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                            disabled={pending || isSearching}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={pending || isSearching || !selectedUser}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            {pending ? (
                                <>
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                                    Promoting...
                                </>
                            ) : (
                                'Promote to Admin'
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AdminFormDialog;