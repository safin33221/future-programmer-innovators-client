"use client";

import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { useActionState } from "react";
import { register } from "@/services/auth/register";

export default function RegisterForm() {
    const [state, formAction, isPending] = useActionState(register, null)
    return (
        <div className="flex items-center justify-center px-6 py-12">
            <div className="w-full max-w-md">
                <Card>
                    <CardHeader className="text-center space-y-1">
                        <CardTitle className="text-2xl">Create an account</CardTitle>
                        <CardDescription>
                            Enter your details to get started
                        </CardDescription>
                    </CardHeader>

                    <form action={formAction}>
                        <CardContent className="space-y-4">
                            <FieldGroup>
                                {/* First & Last Name */}
                                <div className="grid grid-cols-2 gap-4">
                                    <Field>
                                        <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                                        <Input
                                            id="firstName"
                                            name="firstName"
                                            placeholder="John"
                                        />
                                    </Field>

                                    <Field>
                                        <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                                        <Input
                                            id="lastName"
                                            name="lastName"
                                            placeholder="Doe"
                                        />
                                    </Field>
                                </div>

                                {/* Email */}
                                <Field>
                                    <FieldLabel htmlFor="email">Email</FieldLabel>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="m@example.com"
                                    />
                                </Field>

                                {/* Password */}
                                <Field>
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                    />
                                </Field>

                                {/* Confirm Password */}
                                <Field>
                                    <FieldLabel htmlFor="confirmPassword">
                                        Confirm Password
                                    </FieldLabel>
                                    <Input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                    />
                                </Field>
                            </FieldGroup>

                            <Button disabled={isPending} className="w-full">{isPending ? "Creating..." : "Create Account"}</Button>
                        </CardContent>
                    </form>

                    <CardFooter className="flex flex-col space-y-2 text-center text-sm text-muted-foreground">
                        <div>
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                className="text-primary hover:underline font-medium"
                            >
                                Sign in
                            </Link>
                        </div>

                        <p className="text-xs max-w-sm">
                            By creating an account, you agree to our{" "}
                            <Link href="/terms" className="underline hover:text-primary">
                                Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link href="/privacy" className="underline hover:text-primary">
                                Privacy Policy
                            </Link>
                            .
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
