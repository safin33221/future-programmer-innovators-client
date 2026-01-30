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

    /* ===============================
       STATUS LOGIC
    =============================== */
    const isRejected = application?.status === "REJECTED";
    const isPendingStatus = application?.status === "PENDING";
    const isApproved = application?.status === "APPROVED";

    // Form disabled only when PENDING or APPROVED
    const isFormDisabled = isPendingStatus || isApproved;

    return (
        <form action={formAction}>
            {/* ===============================
               APPLICATION STATUS BANNER
            =============================== */}
            {application && (
                <div
                    className={`mb-8 p-4 border rounded-md text-center
                    ${isRejected && "bg-red-100"}
                    ${isPendingStatus && "bg-yellow-100"}
                    ${isApproved && "bg-green-100"}`}
                >
                    {!isApproved && (
                        <h1 className="font-bold text-2xl">
                            Your Application is {application.status}
                        </h1>
                    )}



                    {isRejected && (
                        <div className="mt-3">
                            <p className="font-semibold">Reason:</p>
                            <p className="text-sm text-muted-foreground">
                                {application.reviewComment ??
                                    "No reason provided. Please update and resubmit."}
                            </p>
                            <p className="mt-2 text-sm font-semibold text-red-600">
                                You can update the form and resubmit.
                            </p>
                        </div>
                    )}

                    {isPendingStatus && (
                        <p className="mt-2">
                            Please wait while admin reviews your application.

                        </p>

                    )}

                    {isApproved && (
                        <div className="mt-4 rounded-lg border text-center border-green-300 bg-green-50 p-4 text-green-900 flex justify-center items-center flex-col">
                            <h3 className="text-lg font-semibold flex items-center text-center gap-2">
                                🎉 Membership Approved!
                            </h3>

                            <p className="mt-2 font-medium">
                                Congratulations! Your membership has been successfully approved.
                            </p>

                            <p className="mt-1">
                                Welcome to the <span className="font-semibold">
                                    Future Programmers Innovators
                                </span>{" "}
                                community.
                            </p>

                            <p className="mt-3 text-sm text-green-800">
                                To access all member features, please{" "}
                                <span className="font-semibold underline">
                                    log out and log in again
                                </span>.
                            </p>
                        </div>
                    )}

                </div>
            )}

            {!isApproved && (
                <div>
                    {/* ===============================
               FORM CONTENT
            =============================== */}
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
                                        disabled={isFormDisabled}
                                    />
                                </Field>

                                <Field>
                                    <FieldLabel>Last Name</FieldLabel>
                                    <Input
                                        name="lastName"
                                        defaultValue={userInfo.lastName}
                                        required
                                        disabled={isFormDisabled}
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
                                <FieldLabel>Student ID</FieldLabel>
                                <Input
                                    name="studentId"
                                    defaultValue={application?.studentId ?? ""}
                                    required
                                    disabled={isFormDisabled}
                                />
                            </Field>

                            {/* Department + Session */}
                            <div className="grid sm:grid-cols-2 gap-6">
                                <Field>
                                    <FieldLabel>Department</FieldLabel>
                                    <Select
                                        name="departmentId"
                                        defaultValue={application?.departmentId ?? ""}
                                        disabled={isFormDisabled}
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
                                        disabled={isFormDisabled}
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
                                    disabled={isFormDisabled}
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
                                    disabled={isFormDisabled}
                                    className="min-h-32"
                                />
                            </Field>

                            {/* Terms */}
                            {!isFormDisabled && (
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

                    {/* ===============================
               SUBMIT BUTTON
            =============================== */}
                    <CardFooter>
                        <Button
                            disabled={isPending || isFormDisabled}
                            className="w-full"
                            size="lg"
                        >
                            {isRejected
                                ? "Resubmit Application"
                                : "Submit Application"}
                        </Button>
                    </CardFooter>
                </div>
            )}
        </form>
    );
};

export default ApplicationFrom;
