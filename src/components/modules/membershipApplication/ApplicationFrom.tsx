"use client";

import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";

import { UserInfo } from "@/types/user/user.interface";
import { IDepartment } from "@/types/department/department.interface";
import { ISession } from "@/types/Session/session.intrface";
import { ILearningTrack } from "@/types/learningTrack/learningTrack.interface";

import { submitMembershipApplication } from "@/services/member/membershipApplication";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CardContent, CardFooter } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

interface ApplicationFormProps {
    userInfo: UserInfo;
    departments: IDepartment[];
    sessions: ISession[];
    learningStack: ILearningTrack[];
}

const ApplicationFrom = ({
    userInfo,
    departments,
    sessions,
    learningStack,
}: ApplicationFormProps) => {
    const application = userInfo.memberShipApplication;

    const [state, formAction, isPending] = useActionState(
        submitMembershipApplication,
        null
    );

    useEffect(() => {
        if (!state) return;
        state.success
            ? toast.success(state.message)
            : toast.error(state.message);
    }, [state]);

    const isSubmitted = !!application;

    return (
        <form action={formAction}>
            {/* Application Status */}
            {userInfo.memberShipApplication && (
                <div className="mb-8 p-4 border rounded-md bg-red-300 text-center">
                    <h1 className="font-bold text-2xl">Your Application is {userInfo?.memberShipApplication?.status}</h1>
                    <p>Please Contact Our Support Team</p>
                    {userInfo?.memberShipApplication?.status === "REJECTED" && (
                        <div className=" p-4 mt-1  rounded-md text-center">
                            <h2>Reason:</h2>
                            <p className="text-sm">
                                {userInfo?.memberShipApplication?.reviewComment || "No reason provided. Contact support."}</p>
                        </div>
                    )}

                </div>
            )}



            <CardContent className="space-y-8">
                <FieldGroup>
                    {/* Name */}
                    <div className="grid sm:grid-cols-2 gap-6">
                        <Field>
                            <FieldLabel>First Name</FieldLabel>
                            <Input
                                name="firstName"
                                defaultValue={userInfo.firstName}
                                required
                                disabled={isSubmitted}
                            />
                        </Field>

                        <Field>
                            <FieldLabel>Last Name</FieldLabel>
                            <Input
                                name="lastName"
                                defaultValue={userInfo.lastName}
                                required
                                disabled={isSubmitted}
                            />
                        </Field>
                    </div>

                    {/* Email */}
                    <Field>
                        <FieldLabel>Email</FieldLabel>
                        <Input name="email" defaultValue={userInfo.email} readOnly />
                    </Field>

                    {/* Student ID */}
                    <Field>
                        <FieldLabel>Student ID</FieldLabel>
                        <Input
                            name="studentId"
                            defaultValue={application?.studentId ?? ""}
                            required
                            disabled={isSubmitted}
                        />
                    </Field>

                    {/* Department + Session */}
                    <div className="grid sm:grid-cols-2 gap-6">
                        <Field>
                            <FieldLabel>Department</FieldLabel>
                            <Select
                                name="departmentId"
                                defaultValue={application?.departmentId ?? ""}
                                disabled={isSubmitted}
                                required
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Department" />
                                </SelectTrigger>
                                <SelectContent>
                                    {departments.map((d) => (
                                        <SelectItem key={d.id} value={d.id}>
                                            {d.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </Field>

                        <Field>
                            <FieldLabel>Session</FieldLabel>
                            <Select
                                name="sessionId"
                                defaultValue={application?.sessionId ?? ""}
                                disabled={isSubmitted}
                                required
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Session" />
                                </SelectTrigger>
                                <SelectContent>
                                    {sessions.map((s) => (
                                        <SelectItem key={s.id} value={s.id}>
                                            {s.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </Field>
                    </div>

                    {/* Learning Track */}
                    <Field>
                        <FieldLabel>Interested Area</FieldLabel>
                        <Select
                            name="interests"
                            defaultValue={application?.learningTrackId ?? ""}
                            disabled={isSubmitted}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Track" />
                            </SelectTrigger>
                            <SelectContent>
                                {learningStack.map((t) => (
                                    <SelectItem key={t.id} value={t.id}>
                                        {t.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </Field>

                    {/* Motivation */}
                    <Field>
                        <FieldLabel>Why do you want to join?</FieldLabel>
                        <Textarea
                            name="joinMotivation"
                            defaultValue={application?.joinMotivation ?? ""}
                            required
                            disabled={isSubmitted}
                            className="min-h-32"
                        />
                    </Field>

                    {/* Terms */}
                    {!isSubmitted && (
                        <div className="flex items-start gap-2">
                            <Checkbox name="terms" required />
                            <span className="text-sm text-muted-foreground">
                                I agree to the Code of Conduct and Terms.
                            </span>
                        </div>
                    )}
                </FieldGroup>

                {/* Hidden */}
                <input type="hidden" name="userId" value={userInfo.id} />
            </CardContent>

            <CardFooter>
                <Button
                    disabled={isPending || isSubmitted}
                    className="w-full"
                    size="lg"
                >
                    {isSubmitted ? "Application Submitted" : "Submit Application"}
                </Button>
            </CardFooter>
        </form>
    );
};

export default ApplicationFrom;
