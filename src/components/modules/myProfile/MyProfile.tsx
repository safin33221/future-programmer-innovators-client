/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getInitials } from "@/lib/formatters";
import { Camera, Loader2, Save } from "lucide-react";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { UserInfo } from "@/types/user/user.interface";

interface MyProfileProps {
    userInfo: UserInfo;
}

const MyProfile = ({ userInfo }: MyProfileProps) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    // Initialize form data from userInfo
    const [formData, setFormData] = useState({
        // Common fields from User
        firstName: userInfo.firstName || "",
        lastName: userInfo.lastName || "",
        phone: userInfo.phone || "",
        bio: userInfo.bio || "",

        // Role-specific fields
        studentId: userInfo.member?.studentId || "",
        departmentId: userInfo.member?.departmentId || "",
        sessionId: userInfo.member?.sessionId || "",
        batch: userInfo.member?.batch || "",
        skills: userInfo.member?.skills?.join(", ") || "",

        expertise: userInfo.mentor?.expertise || "",
        designation: userInfo.mentor?.designation || "",
        company: userInfo.mentor?.company || "",
        experience: userInfo.mentor?.experience || "",

        github: userInfo.mentor?.github || userInfo.member?.github || "",
        linkedin: userInfo.mentor?.linkedin || userInfo.member?.linkedin || "",
        portfolio: userInfo.mentor?.portfolio || "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image size should be less than 5MB");
            return;
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
            toast.error("Please upload an image file");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        startTransition(async () => {
            try {
                // Prepare user update data (common fields)
                const userUpdateData: any = {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    phone: formData.phone,
                    bio: formData.bio,
                };

                // Prepare profile update data based on role
                let profileUpdateData: any = {};

                switch (userInfo.role) {
                    case "MEMBER":
                        profileUpdateData = {
                            studentId: formData.studentId,
                            departmentId: formData.departmentId,
                            sessionId: formData.sessionId,
                            batch: formData.batch,
                            skills: formData.skills.split(",").map(skill => skill.trim()).filter(skill => skill),
                            github: formData.github,
                            linkedin: formData.linkedin,
                        };
                        break;
                    case "MENTOR":
                        profileUpdateData = {
                            expertise: formData.expertise,
                            designation: formData.designation,
                            company: formData.company,
                            experience: formData.experience,
                            github: formData.github,
                            linkedin: formData.linkedin,
                            portfolio: formData.portfolio,
                        };
                        break;
                    case "ADMIN":
                        profileUpdateData = {
                            adminLevel: userInfo.admin?.adminLevel || "BASIC",
                        };
                        break;
                    case "MODERATOR":
                        profileUpdateData = {
                            permissions: userInfo.moderator?.permissions || [],
                            moderationLevel: userInfo.moderator?.moderationLevel || "BASIC",
                        };
                        break;
                }

                // Handle image upload if changed
                if (previewImage) {
                    // Convert base64 to FormData for file upload
                    const formDataToSend = new FormData();
                    const blob = await (await fetch(previewImage)).blob();
                    const file = new File([blob], 'profile.jpg', { type: 'image/jpeg' });
                    formDataToSend.append('profileImage', file);

                    // First upload the image
                    const uploadResponse = await fetch('/api/users/upload-profile-image', {
                        method: 'POST',
                        body: formDataToSend,
                    });

                    if (uploadResponse.ok) {
                        const { imageUrl } = await uploadResponse.json();
                        userUpdateData.profileImage = imageUrl;
                    }
                }

                // Call update API
                const response = await fetch(`/api/users/${userInfo.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userData: userUpdateData,
                        profileData: profileUpdateData
                    }),
                });

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.message || 'Failed to update profile');
                }

                const result = await response.json();
                console.log(result);

                toast.success("Profile updated successfully!");
                router.refresh();
                setPreviewImage(null);
            } catch (error: any) {
                console.error('Update error:', error);
                toast.error(error.message || "Failed to update profile");
            }
        });
    };

    const getProfileImage = () => {
        if (previewImage) return previewImage;
        if (userInfo.profileImage) return userInfo.profileImage;
        return "";
    };

    const resetForm = () => {
        setFormData({
            firstName: userInfo.firstName || "",
            lastName: userInfo.lastName || "",
            phone: userInfo.phone || "",
            bio: userInfo.bio || "",
            studentId: userInfo.member?.studentId || "",
            departmentId: userInfo.member?.departmentId || "",
            sessionId: userInfo.member?.sessionId || "",
            batch: userInfo.member?.batch || "",
            skills: userInfo.member?.skills?.join(", ") || "",
            expertise: userInfo.mentor?.expertise || "",
            designation: userInfo.mentor?.designation || "",
            company: userInfo.mentor?.company || "",
            experience: userInfo.mentor?.experience || "",
            github: userInfo.mentor?.github || userInfo.member?.github || "",
            linkedin: userInfo.mentor?.linkedin || userInfo.member?.linkedin || "",
            portfolio: userInfo.mentor?.portfolio || "",
        });
        setPreviewImage(null);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold">My Profile</h1>
                <p className="text-muted-foreground">
                    Manage your account information
                </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* LEFT – Profile Card */}
                <Card className="max-h-96 sticky top-0">
                    <CardHeader>
                        <CardTitle>Profile Picture</CardTitle>
                    </CardHeader>

                    <CardContent className="flex flex-col items-center gap-4">
                        <div className="relative">
                            <Avatar className="h-28 w-28">
                                <AvatarImage
                                    src={getProfileImage()}
                                    alt={`${userInfo.firstName} ${userInfo.lastName}`}
                                />
                                <AvatarFallback className="text-2xl">
                                    {getInitials(
                                        `${userInfo.firstName} ${userInfo.lastName}`
                                    )}
                                </AvatarFallback>
                            </Avatar>

                            <label className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-2 rounded-full cursor-pointer hover:bg-primary/90 transition-colors">
                                <Camera size={16} />
                                <Input
                                    type="file"
                                    name="profileImage"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageChange}
                                    disabled={isPending}
                                />
                            </label>
                        </div>

                        <div className="text-center">
                            <p className="font-semibold">
                                {userInfo.firstName} {userInfo.lastName}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {userInfo.email}
                            </p>
                            <p className="text-xs uppercase text-muted-foreground mt-1 px-2 py-1 bg-secondary rounded-full inline-block">
                                {userInfo.role}
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* RIGHT – Information */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {/* Common Fields for all roles */}
                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <Label htmlFor="firstName">First Name *</Label>
                                <Input
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    required
                                    disabled={isPending}
                                />
                            </div>

                            <div>
                                <Label htmlFor="lastName">Last Name *</Label>
                                <Input
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    required
                                    disabled={isPending}
                                />
                            </div>

                            <div>
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    disabled={isPending}
                                />
                            </div>

                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={userInfo.email}
                                    disabled
                                    className="bg-muted"
                                />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="bio">Bio</Label>
                            <textarea
                                id="bio"
                                name="bio"
                                value={formData.bio}
                                onChange={handleInputChange}
                                className="w-full min-h-20 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                disabled={isPending}
                                maxLength={500}
                            />
                            <p className="text-xs text-muted-foreground mt-1 text-right">
                                {formData.bio.length}/500 characters
                            </p>
                        </div>

                        {/* MEMBER Specific Fields */}
                        {userInfo.role === "MEMBER" && (
                            <>
                                <div className="pt-4 border-t">
                                    <h3 className="text-lg font-medium mb-4">Academic Information</h3>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div>
                                            <Label htmlFor="studentId">Student ID</Label>
                                            <Input
                                                id="studentId"
                                                name="studentId"
                                                value={formData.studentId}
                                                onChange={handleInputChange}
                                                disabled={isPending}
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="departmentId">Department ID</Label>
                                            <Input
                                                id="departmentId"
                                                name="departmentId"
                                                value={formData.departmentId}
                                                onChange={handleInputChange}
                                                disabled={isPending}
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="sessionId">Session ID</Label>
                                            <Input
                                                id="sessionId"
                                                name="sessionId"
                                                value={formData.sessionId}
                                                onChange={handleInputChange}
                                                disabled={isPending}
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="batch">Batch</Label>
                                            <Input
                                                id="batch"
                                                name="batch"
                                                value={formData.batch}
                                                onChange={handleInputChange}
                                                disabled={isPending}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 border-t">
                                    <h3 className="text-lg font-medium mb-4">Skills</h3>
                                    <div>
                                        <Label htmlFor="skills">Skills (comma separated)</Label>
                                        <Input
                                            id="skills"
                                            name="skills"
                                            value={formData.skills}
                                            onChange={handleInputChange}
                                            disabled={isPending}
                                            placeholder="JavaScript, React, Node.js, MongoDB"
                                        />
                                        <p className="text-xs text-muted-foreground mt-1">
                                            Enter skills separated by commas
                                        </p>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* MENTOR Specific Fields */}
                        {userInfo.role === "MENTOR" && (
                            <>
                                <div className="pt-4 border-t">
                                    <h3 className="text-lg font-medium mb-4">Professional Information</h3>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div>
                                            <Label htmlFor="expertise">Expertise *</Label>
                                            <Input
                                                id="expertise"
                                                name="expertise"
                                                value={formData.expertise}
                                                onChange={handleInputChange}
                                                required
                                                disabled={isPending}
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="designation">Designation *</Label>
                                            <Input
                                                id="designation"
                                                name="designation"
                                                value={formData.designation}
                                                onChange={handleInputChange}
                                                required
                                                disabled={isPending}
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="company">Company</Label>
                                            <Input
                                                id="company"
                                                name="company"
                                                value={formData.company}
                                                onChange={handleInputChange}
                                                disabled={isPending}
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="experience">Experience</Label>
                                            <Input
                                                id="experience"
                                                name="experience"
                                                value={formData.experience}
                                                onChange={handleInputChange}
                                                disabled={isPending}
                                                placeholder="e.g., 5 years"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Social Links (for Members and Mentors) */}
                        {(userInfo.role === "MEMBER" || userInfo.role === "MENTOR") && (
                            <div className="pt-4 border-t">
                                <h3 className="text-lg font-medium mb-4">Social Profiles</h3>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <Label htmlFor="github">GitHub</Label>
                                        <Input
                                            id="github"
                                            name="github"
                                            value={formData.github}
                                            onChange={handleInputChange}
                                            disabled={isPending}
                                            placeholder="https://github.com/username"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="linkedin">LinkedIn</Label>
                                        <Input
                                            id="linkedin"
                                            name="linkedin"
                                            value={formData.linkedin}
                                            onChange={handleInputChange}
                                            disabled={isPending}
                                            placeholder="https://linkedin.com/in/username"
                                        />
                                    </div>

                                    {userInfo.role === "MENTOR" && (
                                        <div className="md:col-span-2">
                                            <Label htmlFor="portfolio">Portfolio Website</Label>
                                            <Input
                                                id="portfolio"
                                                name="portfolio"
                                                value={formData.portfolio}
                                                onChange={handleInputChange}
                                                disabled={isPending}
                                                placeholder="https://yourportfolio.com"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </CardContent>

                    <div className="flex justify-end gap-3 p-6 border-t">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={resetForm}
                            disabled={isPending}
                        >
                            Reset
                        </Button>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? (
                                <>
                                    <Loader2 className="animate-spin mr-2" size={16} />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="mr-2" size={16} />
                                    Save Changes
                                </>
                            )}
                        </Button>
                    </div>
                </Card>
            </div>
        </form>
    );
};

export default MyProfile;