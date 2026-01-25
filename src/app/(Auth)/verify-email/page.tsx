"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Mail } from "lucide-react";
import { Logo } from "@/components/common/Logo";

export default function VerifyEmail() {
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
    const inputsRef = useRef<HTMLInputElement[]>([]);

    const handleChange = (value: string, index: number) => {
        if (!/^\d?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handleVerify = () => {
        const code = otp.join("");
        if (code.length !== 6) {
            alert("Please enter 6 digit OTP");
            return;
        }


    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
            <div className="w-full max-w-md space-y-8">
                <div className="flex justify-center">
                    <Logo />
                </div>

                <Card className="text-center">
                    <CardHeader>
                        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                            <Mail className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-2xl">Verify your email</CardTitle>
                        <CardDescription>
                            Enter the 6-digit code sent to your email
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <div className="flex justify-center gap-2">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => {
                                        if (el) inputsRef.current[index] = el;
                                    }}
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) =>
                                        handleChange(e.target.value, index)
                                    }
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    className="w-10 h-12 text-center text-lg font-semibold border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            ))}
                        </div>

                        <Button className="w-full" onClick={handleVerify}>
                            Verify OTP
                        </Button>

                        <Button variant="outline" className="w-full">
                            Resend OTP
                        </Button>
                    </CardContent>

                    <CardFooter className="justify-center">
                        <Link
                            href="/login"
                            className="text-sm text-primary hover:underline font-medium"
                        >
                            Back to Login
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
