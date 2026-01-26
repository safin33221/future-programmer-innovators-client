/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState } from "react";
import { useActionState } from "react";
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
import { Loader2 } from "lucide-react";

import { register } from "@/services/auth/register";
import { sendOtp, verifyOtp } from "@/services/otp/otp";

type Step = "EMAIL" | "OTP" | "REGISTER";

const OTP_TIMEOUT = 120;
const OTP_LENGTH = 6;

export default function RegisterFlow() {
    const [step, setStep] = useState<Step>("EMAIL");
    const [email, setEmail] = useState("");
    const [verifiedToken, setVerifiedToken] = useState("");
    const [secondsLeft, setSecondsLeft] = useState(0);
    const [isResending, setIsResending] = useState(false);

    const [otp, setOtp] = useState<string[]>(
        Array(OTP_LENGTH).fill("")
    );
    const inputsRef = useRef<HTMLInputElement[]>([]);

    /* ================= OTP INPUT ================= */

    const handleChange = (value: string, index: number) => {
        if (!/^\d?$/.test(value)) return;

        const next = [...otp];
        next[index] = value;
        setOtp(next);

        if (value && index < OTP_LENGTH - 1) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    /* ================= ACTIONS ================= */

    const [, sendAction, sendPending] = useActionState(
        async (_: any, formData: FormData) => {
            const res = await sendOtp(_, formData);

            if (res?.success) {
                setEmail(formData.get("email") as string);
                setOtp(Array(OTP_LENGTH).fill(""));
                setSecondsLeft(OTP_TIMEOUT);
                setStep("OTP");
                toast.success("OTP sent");
            }

            if (res?.error) toast.error(res.error);
            return res;
        },
        null
    );

    const [, otpAction, otpPending] = useActionState(
        async (_: any, formData: FormData) => {
            const res = await verifyOtp(_, formData);

            if (res?.success) {
                setVerifiedToken(res.verifiedToken);
                setStep("REGISTER");
                toast.success("Email verified");
            }

            if (res?.error) toast.error(res.error);
            return res;
        },
        null
    );

    const [, regAction, regPending] = useActionState(
        async (_: any, formData: FormData) => {
            const res = await register(_, formData);

            if (res?.success) toast.success("Account created");
            if (!res?.success) toast.error(res?.message);

            return res;
        },
        null
    );

    /* ================= TIMER ================= */

    useEffect(() => {
        if (secondsLeft <= 0) return;

        const timer = setInterval(() => {
            setSecondsLeft((s) => s - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [secondsLeft]);

    /* ================= RESEND ================= */

    const handleResendOtp = async () => {
        setIsResending(true);
        try {
            const fd = new FormData();
            fd.append("email", email);

            const res = await sendOtp(null, fd);

            if (res?.success) {
                setSecondsLeft(OTP_TIMEOUT);
                setOtp(Array(OTP_LENGTH).fill(""));
                toast.success("OTP resent");
            }

            if (res?.error) toast.error(res.error);
        } finally {
            setIsResending(false);
        }
    };

    /* ================= DERIVED ================= */

    const stepIndex = step === "EMAIL" ? 1 : step === "OTP" ? 2 : 3;
    const isOtpComplete = otp.every(Boolean);

    /* ================= UI ================= */

    return (
        <div className="flex items-center justify-center px-6 py-12">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-4">
                    {/* PROGRESS (CENTERED) */}
                    <div className="flex justify-center">
                        <div className="flex w-full max-w-xs">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex flex-1 items-center">
                                    <div
                                        className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium
                                        ${stepIndex >= i
                                                ? "bg-primary text-white"
                                                : "bg-muted text-muted-foreground"
                                            }`}
                                    >
                                        {i}
                                    </div>
                                    {i !== 3 && (
                                        <div
                                            className={`flex-1 h-1 mx-2 rounded
                                            ${stepIndex > i
                                                    ? "bg-primary"
                                                    : "bg-muted"
                                                }`}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="text-center">
                        <CardTitle>
                            {step === "EMAIL" && "Verify your email"}
                            {step === "OTP" && "Enter verification code"}
                            {step === "REGISTER" && "Create your account"}
                        </CardTitle>
                        {step === "OTP" && (
                            <CardDescription>
                                Code sent to {email}
                            </CardDescription>
                        )}
                    </div>
                </CardHeader>

                <CardContent className="space-y-4">
                    {/* EMAIL STEP */}
                    {step === "EMAIL" && (
                        <form action={sendAction} className="space-y-4">
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

                            <Button className="w-full" disabled={sendPending}>
                                {sendPending ? "Sending..." : "Send OTP"}
                            </Button>
                        </form>
                    )}

                    {/* OTP STEP */}
                    {step === "OTP" && (
                        <form action={otpAction} className="space-y-4">
                            <input type="hidden" name="email" value={email} />
                            <input type="hidden" name="otp" value={otp.join("")} />

                            <div className="flex justify-center gap-2">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={(el) => {
                                            if (el) inputsRef.current[index] = el;
                                        }}
                                        value={digit}
                                        maxLength={1}
                                        onChange={(e) =>
                                            handleChange(e.target.value, index)
                                        }
                                        onKeyDown={(e) =>
                                            handleKeyDown(e, index)
                                        }
                                        className="w-10 h-12 border rounded-md text-center text-lg"
                                    />
                                ))}
                            </div>

                            <Button
                                className="w-full"
                                disabled={!isOtpComplete || otpPending}
                            >
                                Verify OTP
                            </Button>

                            {/* COUNTDOWN / RESEND */}
                            <div className="flex flex-col items-center gap-2 min-h-12">
                                {secondsLeft > 0 ? (
                                    <p className="text-sm text-muted-foreground">
                                        Resend available in{" "}
                                        <span className="font-semibold">
                                            {secondsLeft}s
                                        </span>
                                    </p>
                                ) : (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handleResendOtp}
                                        disabled={isResending}
                                    >
                                        {isResending && (
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        )}
                                        Resend OTP
                                    </Button>
                                )}
                            </div>
                        </form>
                    )}

                    {/* REGISTER STEP */}
                    {step === "REGISTER" && (
                        <form action={regAction} className="space-y-4">
                            <input
                                type="hidden"
                                name="verifiedToken"
                                value={verifiedToken}
                            />

                            <FieldGroup>
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

                            <Button className="w-full" disabled={regPending}>
                                Create Account
                            </Button>
                        </form>
                    )}
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
