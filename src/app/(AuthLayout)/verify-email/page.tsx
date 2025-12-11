'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail } from 'lucide-react';
import { Logo } from '@/components/common/Logo';

export default function VerifyEmail() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">

                <div className="flex flex-col items-center text-center">
                    <Logo />
                </div>

                <Card className="text-center">
                    <CardHeader>
                        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                            <Mail className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-2xl">Check your email</CardTitle>
                        <CardDescription>
                            We&apos;ve sent a verification link to your email address.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                            Click the link in the email to verify your account. If you don&apos;t see it, check your spam folder.
                        </p>

                        <Button variant="outline" className="w-full">
                            Resend Email
                        </Button>
                    </CardContent>

                    <CardFooter className="flex justify-center">
                        <Link href="/login" className="text-sm text-primary hover:underline font-medium">
                            Back to Login
                        </Link>
                    </CardFooter>
                </Card>

            </div>
        </div>
    );
}
