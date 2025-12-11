

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Logo } from "@/components/common/Logo";

export default function Register() {
    return (
        <div className="min-h-screen max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 bg-muted/30">

            {/* Left Side Branding */}
            <div className="flex flex-col justify-center px-10 md:px-16 lg:px-24 py-10 bg-background border-r">

                {/* Logo */}
               <Logo className="scale-110" />

                <h2 className="text-4xl max-md:mt-10 font-bold tracking-tight">
                    Join our coding community
                </h2>

                <p className="mt-4 text-muted-foreground max-w-sm">
                    Learn, build, and grow with fellow innovators.
                    Prepare yourself for programming contests and real-world challenges.
                </p>

                <Link href="/" className="mt-8 inline-block">
                    <Button variant="outline">← Back to Home</Button>
                </Link>
            </div>

            {/* Right Side Register Form */}
            <div className="flex items-center justify-center px-6 py-12">

                <div className="w-full max-w-md">
                    <Card>
                        <CardHeader className="text-center space-y-1">
                            <CardTitle className="text-2xl">Create an account</CardTitle>
                            <CardDescription>
                                Enter your details to get started
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-4">

                            {/* First & Last Name */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">First Name</label>
                                    <Input placeholder="John" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Last Name</label>
                                    <Input placeholder="Doe" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {/* Email */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Email</label>
                                    <Input type="email" placeholder="m@example.com" />
                                </div>

                                {/* Student ID */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Student ID</label>
                                    <Input placeholder="2023CS101" />
                                </div>
                            </div>

                            {/* Program */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Program</label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select program" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="cs">Computer Science</SelectItem>
                                        <SelectItem value="it">Information Technology</SelectItem>
                                        <SelectItem value="ec">Electronics</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Password</label>
                                <Input type="password" />
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Confirm Password</label>
                                <Input type="password" />
                            </div>

                            <Button className="w-full">Create Account</Button>
                        </CardContent>

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
        </div>
    );
}
