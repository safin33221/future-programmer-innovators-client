

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
import { ShieldCheck } from "lucide-react";
import { Logo } from "@/components/common/Logo";

export default function TwoFactorAuth() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">

                <div className="flex flex-col items-center text-center">
                    <Logo />
                </div>

                <Card>
                    <CardHeader className="text-center">
                        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                            <ShieldCheck className="h-6 w-6 text-primary" />
                        </div>

                        <CardTitle className="text-2xl">
                            Two-Factor Authentication
                        </CardTitle>

                        <CardDescription>
                            Enter the 6-digit code sent to your device
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <div className="flex justify-center gap-2">
                            <Input
                                className="text-center text-2xl tracking-widest"
                                placeholder="000000"
                                maxLength={6}
                            />
                        </div>

                        <Button className="w-full">Verify</Button>
                    </CardContent>

                    <CardFooter className="flex justify-center text-sm text-muted-foreground">
                        Didn&apos;t receive the code?
                        <button className="ml-1 text-primary hover:underline font-medium">
                            Resend
                        </button>
                    </CardFooter>
                </Card>

            </div>
        </div>
    );
}
