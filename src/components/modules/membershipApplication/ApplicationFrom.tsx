"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { UserInfo } from "@/types/user/user.interface";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface ApplicationFormProps {
    userInfo: UserInfo
}

const ApplicationFrom = ({ userInfo }: ApplicationFormProps) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        const formData = new FormData(e.currentTarget);

        startTransition(async () => {
            try {
                // await submitMembershipApplication(formData);
                setSuccess("Your membership application has been submitted.");
                router.refresh();
            } catch {
                setError("Failed to submit application. Please try again.");
            }
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <Card className="shadow-sm rounded-2xl">
                <CardHeader className="space-y-2 pb-4">
                    <CardTitle className="text-xl font-semibold">
                        Personal Information
                    </CardTitle>
                    <CardDescription>
                        Fields already available are auto-filled. Please complete the rest.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-8">
                    {/* First + Last Name (default from userInfo) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">First Name</label>
                            <Input
                                name="firstName"
                                defaultValue={userInfo.firstName}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Last Name</label>
                            <Input
                                name="lastName"
                                defaultValue={userInfo.lastName}
                                required
                            />
                        </div>
                    </div>

                    {/* Email (default from userInfo) */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Email Address</label>
                        <Input
                            name="email"
                            type="email"
                            defaultValue={userInfo.email}
                            disabled
                            required
                        />
                    </div>

                    {/* Student ID (NOT available → user fills) */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-red-600">Your Board Roll </label>
                        <Input
                            name="studentId"
                            placeholder="You can apply one with your institution roll "
                            required
                        />
                    </div>

                    {/* Program + Session */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Program / Branch</label>
                            <Select name="program">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Program" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="cs">Computer Science</SelectItem>
                                    <SelectItem value="it">Information Technology</SelectItem>
                                    <SelectItem value="ec">Electronics</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Session</label>
                            <Select name="session">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Session" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="2023-2024">2023-2024</SelectItem>
                                    <SelectItem value="2024-2025">2024-2025</SelectItem>
                                    <SelectItem value="2025-2026">2025-2026</SelectItem>
                                    <SelectItem value="2026-2027">2026-2027</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Areas of Interest */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium">Areas of Interest</label>
                        <div className="grid sm:grid-cols-2 gap-3">
                            {[
                                "Web Development",
                                "App Development",
                                "Cloud Computing",
                                "AI / ML",
                                "Competitive Programming",
                            ].map((item) => (
                                <div key={item} className="flex items-center space-x-2">
                                    <Checkbox name="interests" value={item} />
                                    <span className="text-sm">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Motivation */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Why do you want to join FPI?
                        </label>
                        <Textarea
                            name="motivation"
                            placeholder="Tell us about your motivation..."
                            className="min-h-32.5"
                            required
                        />
                    </div>

                    {/* Terms */}
                    <div className="flex items-start space-x-3">
                        <Checkbox name="terms" required />
                        <span className="text-sm text-muted-foreground">
                            I agree to the Code of Conduct and Terms.
                        </span>
                    </div>

                    {/* Hidden backend-safe fields */}
                    <input type="hidden" name="userId" value={userInfo.id} />
                    <input type="hidden" name="role" value={userInfo.role} />

                    {error && <p className="text-sm text-destructive">{error}</p>}
                    {success && <p className="text-sm text-green-600">{success}</p>}
                </CardContent>

                <CardFooter>
                    <Button className="w-full" size="lg" disabled={isPending}>
                        Submit Application
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
};

export default ApplicationFrom;
