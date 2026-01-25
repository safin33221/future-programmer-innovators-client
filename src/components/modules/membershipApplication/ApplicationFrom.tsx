"use client";

import { UserInfo } from "@/types/user/user.interface";
import { IDepartment } from "@/types/department/department.interface";
import { ISession } from "@/types/Session/session.intrface";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

import { useActionState, useEffect } from "react";
import { submitMembershipApplication } from "@/services/member/membershipApplication";
import toast from "react-hot-toast";

interface ApplicationFormProps {
    userInfo: UserInfo;
    departments: IDepartment[];
    sessions: ISession[];
}

const ApplicationFrom = ({
    userInfo,
    departments,
    sessions,
}: ApplicationFormProps) => {
    const [state, formAction, isPending] = useActionState(
        submitMembershipApplication,
        null
    );

    /* 🔥 TOAST HANDLER */
    useEffect(() => {
        if (!state) return;

        if (state.success) {
            toast.success(state.message || "Application submitted successfully");
        }

        if (state.success === false) {
            toast.error(state.message || "Something went wrong");
        }
    }, [state]);

    return (
        <form action={formAction}>
            <CardContent className="space-y-8">
                <FieldGroup>
                    {/* Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <Field>
                            <FieldLabel>First Name</FieldLabel>
                            <Input
                                name="firstName"
                                defaultValue={userInfo.firstName}
                                required
                            />
                        </Field>

                        <Field>
                            <FieldLabel>Last Name</FieldLabel>
                            <Input
                                name="lastName"
                                defaultValue={userInfo.lastName}
                                required
                            />
                        </Field>
                    </div>

                    {/* Email */}
                    <Field>
                        <FieldLabel>Email</FieldLabel>
                        <Input
                            name="email"
                            defaultValue={userInfo.email}
                            readOnly
                        />
                    </Field>

                    {/* Student ID */}
                    <Field>
                        <FieldLabel className="text-red-600">
                            Board Roll / Student ID
                        </FieldLabel>
                        <Input
                            name="studentId"
                            placeholder="Enter your institution roll"
                            required
                        />
                    </Field>

                    {/* Department + Session */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Department */}
                        <Field>
                            <FieldLabel>Department</FieldLabel>
                            <Select name="departmentId" required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Department" />
                                </SelectTrigger>
                                <SelectContent>
                                    {departments.map((dept) => (
                                        <SelectItem key={dept.id} value={dept.id}>
                                            {dept.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </Field>

                        {/* Session */}
                        <Field>
                            <FieldLabel>Session</FieldLabel>
                            <Select name="sessionId" required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Session" />
                                </SelectTrigger>
                                <SelectContent>
                                    {sessions.map((session) => (
                                        <SelectItem key={session.id} value={session.id}>
                                            {session.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </Field>
                    </div>

                    {/* Interests */}
                    <Field>
                        <FieldLabel>Areas of Interest</FieldLabel>
                        <div className="grid sm:grid-cols-2 gap-3 mt-2">
                            {[
                                "Web Development",
                                "App Development",
                                "Cybersecurity",
                                "Cloud Computing",
                                "Competitive Programming",
                            ].map((item) => (
                                <label
                                    key={item}
                                    className="flex items-center gap-2 text-sm"
                                >
                                    <Checkbox name="interests" value={item} />
                                    {item}
                                </label>
                            ))}
                        </div>
                    </Field>

                    {/* Motivation */}
                    <Field>
                        <FieldLabel>Why do you want to join?</FieldLabel>
                        <Textarea
                            name="joinMotivation"
                            placeholder="Tell us your motivation..."
                            required
                            className="min-h-32"
                        />
                    </Field>

                    {/* Terms */}
                    <div className="flex items-start gap-2">
                        <Checkbox name="terms" required />
                        <span className="text-sm text-muted-foreground">
                            I agree to the Code of Conduct and Terms.
                        </span>
                    </div>
                </FieldGroup>

                {/* Hidden */}
                <input type="hidden" name="userId" value={userInfo.id} />
            </CardContent>

            <CardFooter>
                <Button disabled={isPending} className="w-full" size="lg">
                    {isPending ? "Submitting..." : "Submit Application"}
                </Button>
            </CardFooter>
        </form>
    );
};

export default ApplicationFrom;
