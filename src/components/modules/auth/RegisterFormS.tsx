/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useActionState, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

import { register } from "@/services/auth/register";

export default function RegisterFormS() {
    const [email, setEmail] = useState("");

    const [, regAction, regPending] = useActionState(
        async (_: any, formData: FormData) => {
            const res = await register(_, formData);

            if (res?.success) {
                toast.success("Account created successfully");
            } else {
                toast.error(res?.message || "Registration failed");
            }

            return res;
        },
        null
    );

    return (
        <div className="flex items-center justify-center px-6 py-12">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center space-y-2">
                    <CardTitle>Create your account</CardTitle>
                    <CardDescription>
                        OTP verification is disabled (development mode)
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form action={regAction} className="space-y-4">
                        <FieldGroup>
                            <Field>
                                <FieldLabel>Email</FieldLabel>
                                <Input
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Field>

                            <div className="grid grid-cols-2 gap-4">
                                <Field>
                                    <FieldLabel>First Name</FieldLabel>
                                    <Input name="firstName" required />
                                </Field>

                                <Field>
                                    <FieldLabel>Last Name</FieldLabel>
                                    <Input name="lastName" />
                                </Field>
                            </div>

                            <Field>
                                <FieldLabel>Password</FieldLabel>
                                <Input
                                    type="password"
                                    name="password"
                                    required
                                />
                            </Field>
                        </FieldGroup>

                        {/* DEV TOKEN (optional – only if backend expects it) */}
                        <input
                            type="hidden"
                            name="verifiedToken"
                            value="dev-verified-token"
                        />

                        <Button className="w-full" disabled={regPending}>
                            {regPending ? "Creating..." : "Create Account"}
                        </Button>
                    </form>
                </CardContent>

                <CardFooter className="justify-center text-sm">
                    Already have an account?
                    <Link
                        href="/login"
                        className="ml-1 text-primary underline"
                    >
                        Sign in
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}
