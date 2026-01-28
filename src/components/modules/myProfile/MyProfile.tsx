/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Camera, Loader2, Save } from "lucide-react";

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
import { UserInfo } from "@/types/user/user.interface";

/* ---------------------------------- */
/* LOCAL UI HELPERS                   */
/* ---------------------------------- */

const Section = ({
    title,
    description,
    children,
}: {
    title: string;
    description?: string;
    children: React.ReactNode;
}) => (
    <div className="space-y-4">
        <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            {description && (
                <p className="text-sm text-muted-foreground">{description}</p>
            )}
        </div>
        <div className="rounded-lg border p-4 space-y-4">{children}</div>
    </div>
);

const InputField = ({
    label,
    name,
    value,
    onChange,
    disabled,
    placeholder,
    type = "text",
    readonly,
}: any) => (
    <div className="space-y-1">
        <Label>{label}</Label>
        <Input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            placeholder={placeholder}
            readOnly={readonly}
        />
    </div>
);

/* ---------------------------------- */
/* MAIN COMPONENT                     */
/* ---------------------------------- */

interface MyProfileProps {
    userInfo: UserInfo;
}

const MyProfile = ({ userInfo }: MyProfileProps) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        // core
        firstName: userInfo.firstName || "",
        lastName: userInfo.lastName || "",
        phone: userInfo.phone || "",
        bio: userInfo.bio || "",

        // member
        studentId: userInfo.member?.studentId || "",
        departmentId: userInfo.member?.departmentId || "",
        sessionId: userInfo.member?.sessionId || "",
        batch: userInfo.member?.batch || "",
        skills: userInfo.member?.skills?.join(", ") || "",

        // mentor
        expertise: userInfo.mentor?.expertise || "",
        designation: userInfo.mentor?.designation || "",
        company: userInfo.mentor?.company || "",
        experience: userInfo.mentor?.experience || "",

        // social
        github: userInfo.mentor?.github || userInfo.member?.github || "",
        linkedin: userInfo.mentor?.linkedin || userInfo.member?.linkedin || "",
        portfolio: userInfo.mentor?.portfolio || "",
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Invalid image format");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image must be under 5MB");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => setPreviewImage(reader.result as string);
        reader.readAsDataURL(file);
    };

    const profileImage = previewImage || userInfo.profileImage || "";

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        startTransition(async () => {
            try {
                const userData: any = {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    phone: formData.phone,
                    bio: formData.bio,
                };

                let profileData: any = {};

                if (userInfo.role === "MEMBER") {
                    profileData = {
                        studentId: formData.studentId,
                        departmentId: formData.departmentId,
                        sessionId: formData.sessionId,
                        batch: formData.batch,
                        skills: formData.skills
                            .split(",")
                            .map((s) => s.trim())
                            .filter(Boolean),
                        github: formData.github,
                        linkedin: formData.linkedin,
                    };
                }

                if (userInfo.role === "MENTOR") {
                    profileData = {
                        expertise: formData.expertise,
                        designation: formData.designation,
                        company: formData.company,
                        experience: formData.experience,
                        github: formData.github,
                        linkedin: formData.linkedin,
                        portfolio: formData.portfolio,
                    };
                }

                if (previewImage) {
                    const blob = await (await fetch(previewImage)).blob();
                    const file = new File([blob], "profile.jpg", {
                        type: "image/jpeg",
                    });

                    const imgForm = new FormData();
                    imgForm.append("profileImage", file);

                    const upload = await fetch("/api/users/upload-profile-image", {
                        method: "POST",
                        body: imgForm,
                    });

                    if (upload.ok) {
                        const { imageUrl } = await upload.json();
                        userData.profileImage = imageUrl;
                    }
                }

                const res = await fetch(`/api/users/${userInfo.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userData, profileData }),
                });

                if (!res.ok) throw new Error("Profile update failed");

                toast.success("Profile updated");
                router.refresh();
                setPreviewImage(null);
            } catch (err: any) {
                toast.error(err.message || "Update failed");
            }
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className=" md:sticky top-0">
                <h1 className="text-3xl font-bold">My Profile</h1>
                <p className="text-muted-foreground">
                    Manage your personal and professional information
                </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
                {/* PROFILE CARD */}
                <Card className="h-fit md:sticky top-20">
                    <CardHeader>
                        <CardTitle>Profile</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center gap-4">
                        <div className="relative">
                            <Avatar className="h-28 w-28">
                                <AvatarImage src={profileImage} />
                                <AvatarFallback className="text-2xl">
                                    {getInitials(
                                        `${userInfo.firstName} ${userInfo.lastName}`
                                    )}
                                </AvatarFallback>
                            </Avatar>

                            <label className="absolute bottom-0 right-0 bg-primary p-2 rounded-full text-primary-foreground cursor-pointer">
                                <Camera size={16} />
                                <Input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageChange}
                                    disabled={isPending}
                                />
                            </label>
                        </div>

                        <div className="text-center space-y-1">
                            <p className="font-medium">
                                {userInfo.firstName} {userInfo.lastName}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {userInfo.email}
                            </p>
                            <span className="text-xs uppercase bg-secondary px-3 py-1 rounded-full">
                                {userInfo.role}
                            </span>
                        </div>
                    </CardContent>
                </Card>

                {/* FORM */}
                <Card>
                    <CardContent className="p-6 space-y-8">
                        <Section title="Personal Information">
                            <div className="grid gap-4 md:grid-cols-2">
                                <InputField
                                    label="First Name"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                />
                                <InputField
                                    label="Last Name"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                />
                                <InputField
                                    label="Phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                />
                                <InputField
                                    label="Email"
                                    value={userInfo.email}
                                    disabled
                                />
                            </div>

                            <div className="space-y-1">
                                <Label>Bio</Label>
                                <textarea
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleInputChange}
                                    className="w-full min-h-24 rounded-md border px-3 py-2"
                                />
                            </div>
                        </Section>

                        {userInfo.role === "MEMBER" && (
                            <Section title="Academic Information">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <InputField
                                        label="Student ID"
                                        name="studentId"
                                        value={formData.studentId}
                                        onChange={handleInputChange}
                                        readonly={true}

                                    />
                                    <InputField
                                        label="Department ID"
                                        name="departmentId"
                                        value={formData.departmentId}
                                        onChange={handleInputChange}
                                    />
                                    <InputField
                                        label="Session"
                                        name="sessionId"
                                        value={formData.sessionId}
                                        onChange={handleInputChange}
                                    />
                                    <InputField
                                        label="Batch"
                                        name="batch"
                                        value={formData.batch}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <InputField
                                    label="Skills (comma separated)"
                                    name="skills"
                                    value={formData.skills}
                                    onChange={handleInputChange}
                                />
                            </Section>
                        )}

                        {userInfo.role === "MENTOR" && (
                            <Section title="Professional Information">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <InputField
                                        label="Expertise"
                                        name="expertise"
                                        value={formData.expertise}
                                        onChange={handleInputChange}
                                    />
                                    <InputField
                                        label="Designation"
                                        name="designation"
                                        value={formData.designation}
                                        onChange={handleInputChange}
                                    />
                                    <InputField
                                        label="Company"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleInputChange}
                                    />
                                    <InputField
                                        label="Experience"
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </Section>
                        )}

                        <Section title="Social Profiles">
                            <div className="grid gap-4 md:grid-cols-2">
                                <InputField
                                    label="GitHub"
                                    name="github"
                                    value={formData.github}
                                    onChange={handleInputChange}
                                />
                                <InputField
                                    label="LinkedIn"
                                    name="linkedin"
                                    value={formData.linkedin}
                                    onChange={handleInputChange}
                                />
                                {userInfo.role === "MENTOR" && (
                                    <InputField
                                        label="Portfolio"
                                        name="portfolio"
                                        value={formData.portfolio}
                                        onChange={handleInputChange}
                                    />
                                )}
                            </div>
                        </Section>

                        <div className="flex justify-end gap-3 pt-6 border-t">
                            <Button type="submit" disabled={isPending}>
                                {isPending ? (
                                    <>
                                        <Loader2 className="mr-2 animate-spin" size={16} />
                                        Saving
                                    </>
                                ) : (
                                    <>
                                        <Save className="mr-2" size={16} />
                                        Save Changes
                                    </>
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </form>
    );
};

export default MyProfile;
