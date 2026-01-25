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
import { UserInfo } from "@/types/user/user.interface";
// import { updateMyProfile } from "@/services/auth/auth.service";
// import { UserInfo } from "@/types/user.interface";
import { Camera, Loader2, Save } from "lucide-react";
import { useState, useTransition } from "react";

interface MyProfileProps {
    userInfo: UserInfo;
}

const MyProfile = ({ userInfo }: MyProfileProps) => {


    const [isPending, _startTransition] = useTransition();
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const profile =
        userInfo.admin ||
        userInfo.member ||
        userInfo.mentor


    const profileImage = profile?.profileImage;

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // const formData = new FormData(e.currentTarget);

        // startTransition(async () => {
        //     // const res = await updateMyProfile(formData);
        //     // if (res.success) {
        //     //     setPreviewImage(null);
        //     //     router.refresh();
        //     // }
        // });
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
                <Card>
                    <CardHeader>
                        <CardTitle>Profile</CardTitle>
                    </CardHeader>

                    <CardContent className="flex flex-col items-center gap-4">
                        <div className="relative">
                            <Avatar className="h-28 w-28">
                                <AvatarImage
                                    src={previewImage || profileImage || ""}
                                />
                                <AvatarFallback className="text-2xl">
                                    {getInitials(
                                        `${userInfo.firstName} ${userInfo.lastName}`
                                    )}
                                </AvatarFallback>
                            </Avatar>

                            <label className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-2 rounded-full cursor-pointer">
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
                            <p className="text-xs uppercase text-muted-foreground">
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

                    <CardContent className="grid gap-4 md:grid-cols-2">
                        {/* Common */}
                        <div>
                            <Label>First Name</Label>
                            <Input
                                name="firstName"
                                defaultValue={userInfo.firstName}
                                required
                            />
                        </div>

                        <div>
                            <Label>Last Name</Label>
                            <Input
                                name="lastName"
                                defaultValue={userInfo.lastName}
                                required
                            />
                        </div>

                        {/* MEMBER */}
                        {userInfo.role === "MEMBER" && userInfo.member && (
                            <>
                                <div>
                                    <Label>Student ID</Label>
                                    <Input value={userInfo.member.studentId} disabled />
                                </div>

                                <div>
                                    <Label>Department</Label>
                                    <Input
                                        name="departmentId"
                                        defaultValue={userInfo.member.departmentId}
                                    />
                                </div>

                                <div>
                                    <Label>Session</Label>
                                    <Input
                                        name="sessionId"
                                        defaultValue={userInfo.member.sessionId}
                                    />
                                </div>
                            </>
                        )}

                        {/* MENTOR */}
                        {userInfo.role === "MENTOR" && userInfo.mentor && (
                            <>
                                <div>
                                    <Label>Expertise</Label>
                                    <Input
                                        name="expertise"
                                        defaultValue={userInfo.mentor.expertise}
                                    />
                                </div>

                                <div>
                                    <Label>Designation</Label>
                                    <Input
                                        name="designation"
                                        defaultValue={userInfo.mentor.designation}
                                    />
                                </div>

                                <div>
                                    <Label>Experience</Label>
                                    <Input
                                        name="experience"
                                        defaultValue={userInfo.mentor.experience}
                                    />
                                </div>

                                <div>
                                    <Label>GitHub</Label>
                                    <Input
                                        name="github"
                                        defaultValue={userInfo.mentor.github || ""}
                                    />
                                </div>

                                <div>
                                    <Label>LinkedIn</Label>
                                    <Input
                                        name="linkedin"
                                        defaultValue={userInfo.mentor.linkedin || ""}
                                    />
                                </div>

                                <div>
                                    <Label>Portfolio</Label>
                                    <Input
                                        name="portfolio"
                                        defaultValue={userInfo.mentor.portfolio || ""}
                                    />
                                </div>
                            </>
                        )}
                    </CardContent>

                    <div className="flex justify-end p-6">
                        <Button type="submit" disabled={isPending}>
                            {isPending ? (
                                <Loader2 className="animate-spin mr-2" />
                            ) : (
                                <Save className="mr-2" />
                            )}
                            Save Changes
                        </Button>
                    </div>
                </Card>
            </div>
        </form >
    );
};

export default MyProfile;
