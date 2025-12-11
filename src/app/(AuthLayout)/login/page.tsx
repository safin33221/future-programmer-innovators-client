import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Github } from "lucide-react";
import { Logo } from "@/components/common/Logo";
import SectionTitle from "@/components/shared/SectionTitle";

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
        <Card className="w-full max-w-md mx-auto shadow-sm">
          <CardHeader className="space-y-2 pb-4">
            <CardTitle className="text-2xl font-semibold tracking-tight">
              Sign In
            </CardTitle>
            <CardDescription>
              Enter your email and password to sign in
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5">

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Email</label>
              <Input type="email" placeholder="m@example.com" />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Password</label>
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <Input type="password" />
            </div>

            {/* Remember me */}
            <div className="flex items-center space-x-2 pt-1">
              <Checkbox id="remember" />
              <label htmlFor="remember" className="text-sm">
                Remember me
              </label>
            </div>

            {/* Button */}
            <Button className="w-full h-11 text-base">Sign In</Button>

            {/* Divider */}
            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            {/* GitHub */}
            <Button variant="outline" className="w-full h-11 text-base">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
          </CardContent>

          <CardFooter className="flex flex-col space-y-2 text-center text-sm text-muted-foreground pb-6">
            <p>
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-primary hover:underline font-medium"
              >
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>

      </div>
    </div>
  );
}
