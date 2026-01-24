"use client";

import { useEffect, useState } from "react";
import { useActionState } from "react";
import toast from "react-hot-toast";

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
import Link from "next/link";

import { register } from "@/services/auth/register";
import { sendOtp, verifyOtp } from "@/services/otp/otp";

type Step = "EMAIL" | "OTP" | "REGISTER";

const OTP_TIMEOUT = 120;

export default function RegisterFlow() {
    const [sendState, sendAction, sendPending] = useActionState(sendOtp, null);
    const [otpState, otpAction, otpPending] = useActionState(verifyOtp, null);
    const [regState, regAction, regPending] = useActionState(register, null);

    const [step, setStep] = useState<Step>("EMAIL");
    const [email, setEmail] = useState("");
    const [verifiedToken, setVerifiedToken] = useState("");
    const [secondsLeft, setSecondsLeft] = useState(0);

    /* ================= TOAST + STEP FLOW ================= */

    useEffect(() => {
        if (sendState?.success) {
            toast.success("OTP sent to your email");
            setEmail(sendState.email);
            setSecondsLeft(OTP_TIMEOUT);
            setStep("OTP");
        }
        if (sendState?.error) toast.error(sendState.error);
    }, [sendState]);

    useEffect(() => {
        if (otpState?.success) {
            toast.success("Email verified successfully");
            setVerifiedToken(otpState.verifiedToken);
            setStep("REGISTER");
        }
        if (otpState?.error) toast.error(otpState.error);
    }, [otpState]);

    useEffect(() => {
        if (regState?.success) toast.success("Account created successfully");
        if (regState?.message) toast.error(regState.message);
    }, [regState]);

    /* ================= TIMER ================= */

    useEffect(() => {
        if (secondsLeft <= 0) return;
        const t = setInterval(() => setSecondsLeft((p) => p - 1), 1000);
        return () => clearInterval(t);
    }, [secondsLeft]);

    /* ================= HELPERS ================= */

    const stepIndex = step === "EMAIL" ? 1 : step === "OTP" ? 2 : 3;

    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;

    const handleChangeEmail = () => {
        setStep("EMAIL");
        setEmail("");
        setSecondsLeft(0);
    };

    return (
        <div className="flex items-center justify-center px-6 py-12">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-4">
                    {/* ================= PROGRESS ================= */}
                    <div className="w-full flex justify-center mb-4">
                        <div className="flex items-center w-full max-w-xs">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center flex-1">
                                    {/* Circle */}
                                    <div
                                        className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium shrink-0
                                            ${stepIndex >= i
                                                ? "bg-primary text-white"
                                                : "bg-muted text-muted-foreground"
                                            }`}
                                    >
                                        {i}
                                    </div>

                                    {/* Line */}
                                    {i !== 3 && (
                                        <div
                                            className={`flex-1 h-1 mx-2 rounded
            ${stepIndex > i ? "bg-primary" : "bg-muted"}`}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>


                    <div className="text-center space-y-1">
                        <CardTitle className="text-2xl">
                            {step === "EMAIL" && "Verify your email"}
                            {step === "OTP" && "Enter verification code"}
                            {step === "REGISTER" && "Create your account"}
                        </CardTitle>

                        <CardDescription>
                            {step === "EMAIL" && "We’ll send a 6-digit code"}
                            {step === "OTP" && `Code sent to ${email}`}
                            {step === "REGISTER" && "Finish setting up your account"}
                        </CardDescription>
                    </div>
                </CardHeader>

                <CardContent className="space-y-4">
                    {/* STEP 1 */}
                    {step === "EMAIL" && (
                        <form action={sendAction} className="space-y-4">
                            <Field>
                                <FieldLabel>Email</FieldLabel>
                                <Input name="email" type="email" placeholder="Enter Your Email" required />
                            </Field>

                            <Button disabled={sendPending} className="w-full">
                                {sendPending ? "Sending..." : "Send OTP"}
                            </Button>
                        </form>
                    )}

                    {/* STEP 2 */}
                    {step === "OTP" && (
                        <>
                            <form action={otpAction} className="space-y-4">
                                <input type="hidden" name="email" value={email} />

                                <Field>
                                    <FieldLabel>OTP</FieldLabel>
                                    <Input name="otp" placeholder="enter your OTP" required />
                                </Field>

                                <Button disabled={otpPending} className="w-full">
                                    {otpPending ? "Verifying..." : "Verify OTP"}
                                </Button>
                            </form>

                            <div className="flex justify-between text-sm mt-2">
                                <Button
                                    variant="link"
                                    className="p-0"
                                    onClick={handleChangeEmail}
                                >
                                    Change email
                                </Button>

                                {secondsLeft > 0 && (
                                    <span className="text-muted-foreground">
                                        Resend in {minutes}:{seconds.toString().padStart(2, "0")}
                                    </span>
                                )}
                            </div>

                            {secondsLeft <= 0 && (
                                <form action={sendAction} className="text-center">
                                    <input type="hidden" name="email" value={email} />
                                    <Button variant="link" className="p-0">
                                        Resend OTP
                                    </Button>
                                </form>
                            )}
                        </>
                    )}

                    {/* STEP 3 */}
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
                                    <FieldLabel>Email</FieldLabel>
                                    <Input name="email" value={email} readOnly />
                                </Field>

                                <Field>
                                    <FieldLabel>Password</FieldLabel>
                                    <Input type="password" name="password" required />
                                </Field>
                            </FieldGroup>

                            <Button disabled={regPending} className="w-full">
                                {regPending ? "Creating..." : "Create Account"}
                            </Button>
                        </form>
                    )}
                </CardContent>

                <CardFooter className="justify-center text-sm text-muted-foreground">
                    Already have an account?
                    <Link href="/login" className="ml-1 text-primary hover:underline">
                        Sign in
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}
