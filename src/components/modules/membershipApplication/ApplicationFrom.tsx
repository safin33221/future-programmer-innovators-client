"use client";

import { UserInfo } from "@/types/user/user.interface";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    CardContent, CardFooter
} from "@/components/ui/card";
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
import { useActionState } from "react";
import { submitMembershipApplication } from "@/services/member/membershipApplication";

interface ApplicationFormProps {
    userInfo: UserInfo
}

const ApplicationFrom = ({ userInfo }: ApplicationFormProps) => {


    const [state, formAction, isPending] = useActionState(
        submitMembershipApplication,
        null
    );

    console.log(state);

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

                    {/* Program + Session */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <Field>
                            <FieldLabel>Program / Branch</FieldLabel>
                            <Select name="program" required>
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
                        </Field>

                        <Field>
                            <FieldLabel>Session</FieldLabel>
                            <Select name="session" required>
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
                            className="min-h-30"
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
                <input type="hidden" name="role" value={userInfo.role} />

                {/* {state?.success === false && (
                    <p className="text-sm text-destructive">{state.message}</p>
                )}
                {state?.success === true && (
                    <p className="text-sm text-green-600">{state.message}</p>
                )} */}
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
