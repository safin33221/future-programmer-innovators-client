import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/common/Logo";
import SectionTitle from "@/components/shared/SectionTitle";
import LoginForm from "@/components/modules/auth/LoginForm";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 py-16 px-6 relative">

      {/* Back Button */}
      <Link href="/" className="absolute top-6 left-6">
        <Button variant="outline" size="sm">
          ← Back to Home
        </Button>
      </Link>

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* Left Side */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6">
          <Logo className="scale-125" />

          <div className="space-y-3">
            <SectionTitle title="Welcome" highlight="Back" className="mb-1" />

            <p className="text-sm text-muted-foreground max-w-xs md:max-w-sm leading-relaxed">
              Sign in to your account to continue learning
            </p>
          </div>
        </div>

        {/* Right Side — Login Card */}
        <LoginForm />

      </div>
    </div>
  );
}
