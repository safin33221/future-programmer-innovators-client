"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/common/Logo";

export default function ForgotPassword() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">

                <div className="flex flex-col items-center text-center">
                    <Logo className="pb-10" />

                    <h2 className="text-3xl font-bold tracking-tight">Reset Password</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Enter your email address and we&apos;ll send you a link to reset your password
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Forgot Password</CardTitle>
                        <CardDescription>
                            Enter your email to receive reset instructions
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-sm font-medium">Email</label>
                            <Input type="email" placeholder="m@example.com" />
                        </div>
                        <Button className="w-full">Send Reset Link</Button>
                    </CardContent>

                    <CardFooter className="flex justify-center">
                        <Link
                            href="/login"
                            className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Login
                        </Link>
                    </CardFooter>
                </Card>

            </div>
        </div>
    );
}
