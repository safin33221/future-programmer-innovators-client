

import Link from "next/link";
import { Button } from "@/components/ui/button";

import { Logo } from "@/components/common/Logo";
import RegisterForm from "@/components/modules/auth/RegisterForm";

export default function Register() {
    return (
        <div className="min-h-screen max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 bg-muted/30">

            {/* Left Side Branding */}
            <div className="flex flex-col justify-center px-10 md:px-16 lg:px-24 py-10 bg-background border-r">

                {/* Logo */}
                <Logo className="scale-110 ml-6" />

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
            <RegisterForm />
        </div>
    );
}
